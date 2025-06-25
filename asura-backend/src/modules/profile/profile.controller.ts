import { IUser } from "@modules/users";
import ProfileService from "./profile.service";
import { Request, Response, NextFunction } from "express";
import CreateProfileDto from "./dtos/create_profile.dto";
import AddExperienceDto from "./dtos/add_experience.dto";
import AddEducationDto from "./dtos/add_education.dto";

class ProfileController {
  private profileService = new ProfileService();

  public getCurrentProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.user.id;
      const resultObj = await this.profileService.getCurrentProfile(userId); //resultObj: Partial<IUser>
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };

  public getByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    //Day cx la lay Profile nma ko p cua minh ma cua ng khac
    try {
      const userId = req.params.id;
      const resultObj = await this.profileService.getCurrentProfile(userId);
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };

  public getAllProfiles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const resultObj = await this.profileService.getAllProfiles();
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };

  public createProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const userData: CreateProfileDto = req.body;
    const userId = res.locals.user.id;
    try {
      const resultObj = await this.profileService.createProfile(
        userId,
        userData
      );
      res.status(200).json({ data: resultObj });
    } catch (error) {
      next(error);
    }
  };

  public deleteProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.id;
      const resultObj = await this.profileService.deleteProfile(userId);
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };

  public createExperience = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data: AddExperienceDto = req.body;
    const userId = res.locals.user.id;
    try {
      const resultObj = await this.profileService.addExperience(userId, data);
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };

  public deleteExperience = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const expId = req.params.exp_id;
      const resultObj = await this.profileService.deleteExperience(
        res.locals.user.id,
        expId
      );
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  }; //Xong sang route add duong dan create & delete

  public createEducation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const data: AddEducationDto = req.body;
    const userId = res.locals.user.id;
    try {
      const resultObj = await this.profileService.addEducation(userId, data);
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };

  public deleteEducation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const eduId = req.params.edu_id;
      const resultObj = await this.profileService.deleteEducation(
        res.locals.user.id,
        eduId
      );
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  }; //Xong sang route add duong dan create & delete
  public follow = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //const fromUserId = req.params.fromid; follow thì xuất phát từ mình => user là fromUser
      const fromUserId = res.locals.user.id;
      const toUserId = req.params.id;
      const resultObj = await this.profileService.follow(fromUserId, toUserId);
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };
  public unfollow = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //const fromUserId = req.params.fromid; follow thì xuất phát từ mình => user là fromUser
      const fromUserId = res.locals.user.id;
      const toUserId = req.params.id;
      const resultObj = await this.profileService.unFollow(
        fromUserId,
        toUserId
      );
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };
  public addFriendReq = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const fromUserId = res.locals.user.id;
      const toUserId = req.params.id;
      const resultObj = await this.profileService.friendRequest(
        fromUserId,
        toUserId
      );
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };
  public cancelFriendReq = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const fromUserId = res.locals.user.id;
      const toUserId = req.params.id;
      const resultObj = await this.profileService.cancelFriendRequest(
        fromUserId,
        toUserId
      );
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };
  public acceptFriend = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const fromUserId = res.locals.user.id;
      const toUserId = req.params.id;
      const resultObj = await this.profileService.AddFriend(
        fromUserId,
        toUserId
      );
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };
  public removeFriend = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const fromUserId = res.locals.user.id;
      const toUserId = req.params.id;
      const resultObj = await this.profileService.UnFriend(
        fromUserId,
        toUserId
      );
      res.status(200).json(resultObj);
    } catch (error) {
      next(error);
    }
  };
}
export default ProfileController;
