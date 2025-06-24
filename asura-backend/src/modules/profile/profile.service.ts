import { IUser, UserSchema } from "@modules/users";
import {
  IEducation,
  IExperience,
  IFollower,
  IFriend,
  IProfile,
  ISocial,
} from "./profile.interface";
import ProfileSchema from "./profile.model";
import { HttpException } from "@core/exceptions";
import CreateProfileDto from "./dtos/create_profile.dto";
import { NextFunction } from "express";
import { isWebUri } from "valid-url";
import AddExperienceDto from "./dtos/add_experience.dto";
import AddEducationDto from "./dtos/add_education.dto";
class ProfileService {
  public async getCurrentProfile(userId: string): Promise<Partial<IUser>> {
    const user = await ProfileSchema.findOne({ user: userId })
      .populate("user", ["name", "avatar"]) //Day la populate cac thuoc tinh cua thang con, kieu no se gan them doi tuong user vao profile nhung user nay chi co name, avt thoi
      .exec();
    if (!user) {
      throw new HttpException(400, "There is no profile for this user!");
    }
    return user;
  }

  public async createProfile(
    userId: string,
    profileDto: CreateProfileDto
  ): Promise<IProfile> {
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = profileDto; //Trai profile ra thanh doi tuong chua cac thuoc tinh nhu tren cho de xu ly
    //Khai bao cac field va gan gia tri
    const profileFields: Partial<IProfile> = {
      user: userId,
      company,
      location,
      //Can normalize de chuan hoa url
      website: isWebUri(website) ? website : "",
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map((skills: string) => " " + skills.trim()),
      status,
    };

    const socialField: ISocial = {
      youtube,
      twitter,
      linkedin,
      facebook,
      instagram, //Sau khi co cai nay r cta p chay qua no de cta force cai viec htms cho no
    };
    for (const [key, value] of Object.entries(socialField)) {
      if (value && value.length > 0) {
        socialField[key] = isWebUri(value) ? value : "";
      }
    }

    profileFields.social = socialField; //Chuan hoa xong r thi gan kq vao .social

    const profile = await ProfileSchema.findOneAndUpdate(
      { user: userId },
      { $set: profileFields },
      { new: true, upsert: true, setDefaultsOnInsert: true } //new true thi neu update, no se gia ve doi tuong moi. Cai cuoi co nghia la cac date default o trong model thi chi ra het, may cai thuoc tinh object nay cac b chi can doc o trong document no ra
    ).exec();

    return profile; //B31.17: Viet pthuc update profile
  }
  public async deleteProfile(userId: string) {
    await ProfileSchema.findOneAndDelete({ user: userId }).exec();
    await UserSchema.findOneAndDelete({ _id: userId }).exec();
  } //B31.19 Tao moi controller
  public async getAllProfiles() {
    const profiles = await ProfileSchema.find()
      .populate("user", ["name", "product"])
      .exec();
    return profiles;
  }
  //B32.1
  public addExperience = async (
    userId: string,
    experience: AddExperienceDto
  ) => {
    const newExp = {
      ...experience,
    };

    const profile = await ProfileSchema.findOne({ user: userId }).exec();
    if (!profile) {
      throw new HttpException(400, "There is no profile for this user");
    }
    //Add moi 1 ban ghi vao dau mang
    profile.experience.unshift(newExp as IExperience);
    await profile.save();

    return profile;
  };

  public deleteExperience = async (userId: string, experienceId: string) => {
    const profile = await ProfileSchema.findOne({ user: userId }).exec();

    if (!profile) {
      throw new HttpException(400, "There is no profile for this user");
    }

    profile.experience = profile.experience.filter(
      (exp) => exp._id.toString() !== experienceId
    );
    await profile.save();
    return profile;
  }; //B31.10 sang controll add ctrl

  public addEducation = async (userId: string, education: AddEducationDto) => {
    const newEdu = {
      ...education,
    };

    const profile = await ProfileSchema.findOne({ user: userId }).exec();
    if (!profile) {
      throw new HttpException(400, "There is no profile for this user");
    }

    profile.education.unshift(newEdu as IEducation);
    await profile.save();

    return profile;
  };

  public follow = async (fromUserId: string, toUserId: string) => {
    if (fromUserId === toUserId) {
      throw new HttpException(400, "You cannot follow yourself");
    }
    const fromProfile = await ProfileSchema.findOne({
      user: fromUserId,
    }).exec();
    if (!fromProfile) {
      throw new HttpException(400, "There is no profile for this user");
    }
    console.log("fromProfile.followings", fromProfile.followings);
    if (
      fromProfile.followings &&
      fromProfile.followings.some(
        (follower: IFollower) => follower.user.toString() === toUserId
      )
    )
      throw new HttpException(400, "You has been already followed this user");

    const toProfile = await ProfileSchema.findOne({ user: toUserId }).exec();
    if (!toProfile) {
      throw new HttpException(400, "There is no profile for this user");
    }
    fromProfile.followings.unshift({ user: toUserId });
    toProfile.followers.unshift({ user: fromUserId });
    //await fromProfile.save();
    //await toProfile.save();
    await Promise.all([fromProfile.save(), toProfile.save()]);
    //khong return ca 2 duoc, trong ham nay thi fromProfile dang xu ly
    return toProfile;
  };

  public unFollow = async (fromUserId: string, toUserId: string) => {
    if (fromUserId === toUserId) {
      throw new HttpException(400, "You cannot unfollow yourself");
    }
    const fromProfile = await ProfileSchema.findOne({
      user: fromUserId,
    }).exec();
    if (!fromProfile) {
      throw new HttpException(400, "There is no profile for you");
    }
    if (
      !fromProfile.followings ||
      !fromProfile.followings.some(
        (follower: IFollower) => follower.user.toString() == toUserId
      )
    )
      throw new HttpException(400, "You has not followed this user yet");

    const toProfile = await ProfileSchema.findOne({ user: toUserId }).exec();
    if (!toProfile) {
      throw new HttpException(400, "There is no profile for this user");
    }
    fromProfile.followings = fromProfile.followings.filter(
      ({ user }) => user.toString() !== toUserId
    );
    toProfile.followers = toProfile.followers.filter(
      ({ user }) => user.toString() !== fromUserId
    );
    //await fromProfile.save();
    //await toProfile.save();
    await Promise.all([fromProfile.save(), toProfile.save()]);
    //khong return ca 2 duoc, trong ham nay thi fromProfile dang xu ly
    return toProfile;
  };

  public friendRequest = async (fromUserId: string, toUserId: string) => {
    if (fromUserId === toUserId) {
      throw new HttpException(
        400,
        "You cannot send friend request to yourself"
      );
    }
    const fromProfile = await ProfileSchema.findOne({
      user: fromUserId,
    }).exec();
    if (!fromProfile) {
      throw new HttpException(400, "There is no profile for you");
    }
    console.log("fromProfile.friend_request", fromProfile.friend_request);
    if (
      fromProfile.friend_request &&
      fromProfile.friend_request.some(
        (request: IFriend) => request.user.toString() === toUserId
      )
    )
      throw new HttpException(
        400,
        "You has been already send friend request to this user"
      );

    const toProfile = await ProfileSchema.findOne({ user: toUserId }).exec();
    if (!toProfile) {
      throw new HttpException(400, "There is no profile for this user");
    }
    fromProfile.friend_request.unshift({
      user: toUserId,
      date: new Date(Date.now()),
    });
    //await fromProfile.save();
    //await toProfile.save();
    await fromProfile.save();
    //khong return ca 2 duoc, trong ham nay thi fromProfile dang xu ly
    return fromProfile;
  };

  public cancelFriendRequest = async (fromUserId: string, toUserId: string) => {
    if (fromUserId === toUserId) {
      throw new HttpException(
        400,
        "You cannot cancel friend request to yourself"
      );
    }
    const fromProfile = await ProfileSchema.findOne({
      user: fromUserId,
    }).exec();
    if (!fromProfile) {
      throw new HttpException(400, "There is no profile for you");
    }
    if (
      !fromProfile.friend_request ||
      !fromProfile.friend_request.some(
        (follower: IFollower) => follower.user.toString() === toUserId
      )
    )
      throw new HttpException(
        400,
        "You has not sent friend request to this user yet"
      );

    const toProfile = await ProfileSchema.findOne({ user: toUserId }).exec();
    if (!toProfile) {
      throw new HttpException(400, "There is no profile for this user");
    }
    fromProfile.friend_request = fromProfile.friend_request.filter(
      ({ user }) => user.toString() !== toUserId
    );
    //await fromProfile.save();
    //await toProfile.save();
    await fromProfile.save();
    //khong return ca 2 duoc, trong ham nay thi fromProfile dang xu ly
    return fromProfile;
  };

  public AddFriend = async (fromUserId: string, toUserId: string) => {
    if (fromUserId === toUserId) {
      throw new HttpException(400, "You cannot add friend to yourself");
    }
    const fromProfile = await ProfileSchema.findOne({
      user: fromUserId,
    }).exec();
    if (!fromProfile) {
      throw new HttpException(400, "There is no profile for you");
    }
    if (
      fromProfile.friends &&
      fromProfile.friends.some(
        (friend: IFriend) => friend.user.toString() === toUserId
      )
    )
      throw new HttpException(
        400,
        "You has already been friend with this user"
      );

    const toProfile = await ProfileSchema.findOne({ user: toUserId }).exec();
    if (
      (fromProfile !== null && !fromProfile.friend_request) ||
      (fromProfile !== null &&
        !fromProfile.friend_request.some(
          (request: IFriend) => request.user.toString() === toUserId
        ))
    )
      throw new HttpException(
        400,
        "You has not sent friend request to this user yet"
      );

    if (!toProfile) {
      throw new HttpException(400, "There is no profile for this user");
    }
    fromProfile.friends.unshift({ user: toUserId, date: new Date(Date.now()) });
    toProfile.friends.unshift({ user: fromUserId, date: new Date(Date.now()) });
    fromProfile.friend_request = fromProfile.friend_request.filter(
      ({ user }) => user.toString() !== toUserId
    );
    await fromProfile.save();
    await toProfile.save();
    return fromProfile;
  };
  public UnFriend = async (fromUserId: string, toUserId: string) => {
    if (fromUserId === toUserId) {
      throw new HttpException(400, "You cannot unfriend to yourself");
    }
    const fromProfile = await ProfileSchema.findOne({
      user: fromUserId,
    }).exec();
    if (!fromProfile) {
      throw new HttpException(400, "There is no profile for you");
    }
    if (
      !fromProfile.friends ||
      !fromProfile.friends.some(
        (friend: IFriend) => friend.user.toString() === toUserId
      )
    )
      throw new HttpException(
        400,
        "You has not been friend with this user yet"
      );

    const toProfile = await ProfileSchema.findOne({ user: toUserId }).exec();
    if (!toProfile) {
      throw new HttpException(400, "There is no profile for this user");
    }
    fromProfile.friends = fromProfile.friends.filter(
      ({ user }) => user.toString() !== toUserId
    );
    toProfile.friends = fromProfile.friends.filter(
      ({ user }) => user.toString() !== toUserId
    );
    await Promise.all([fromProfile.save(), toProfile.save()]);
    return fromProfile;
  };

  public deleteEducation = async (userId: string, educationId: string) => {
    const profile = await ProfileSchema.findOne({ user: userId }).exec();

    if (!profile) {
      throw new HttpException(400, "There is no profile for this user");
    }

    profile.education = profile.education.filter(
      (edu) => edu._id.toString() !== educationId
    );
    await profile.save();
    return profile;
  }; //B31.10 sang controll add ctrl
}
export default ProfileService; //B31.23 Vao phan routing
