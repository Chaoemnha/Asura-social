import { HttpException } from "@core/exceptions";
import { GroupSchema } from ".";
import CreateGroupDto from "./dtos/create_group_dto";
import { IGroup, IManager, IMember } from "./groups.interface";
import { IUser, UserSchema } from "@modules/users";
import SetManagerDto from "./dtos/set_manager_dto";

export default class GroupService {
  public async createGroup(
    userId: string,
    groupDto: CreateGroupDto
  ): Promise<IGroup> {
    const user = await UserSchema.findById(userId).select("-password").exec();
    if (!user) throw new HttpException(400, "User id is not exists");
    const existingGroup = await GroupSchema.find({
      $or: [{ name: groupDto.name }, { code: groupDto.code }],
    });
    if (existingGroup.length > 0)
      throw new HttpException(400, "Name or code existed");
    const newGroup = new GroupSchema({ ...groupDto });
    const group = await newGroup.save();
    return group;
  }
  public async updateGroup(
    groupId: string,
    groupDto: CreateGroupDto
  ): Promise<IGroup> {
    console.log("groupId", groupId);
    const group = await GroupSchema.findById(groupId).exec();
    if (!group) throw new HttpException(400, "Group id is not exists");
    const existingGroup = await GroupSchema.findOne({
      $and: [
        { _id: { $ne: groupId } },
        { $or: [{ name: groupDto.name }, { code: groupDto.code }] },
      ],
    });
    if (existingGroup) throw new HttpException(400, "Name or code existed");
    const groupFields = { ...groupDto };
    const newGroup = await GroupSchema.findOneAndUpdate(
      { _id: groupId },
      { $set: groupFields },
      { new: true }
    ).exec();
    if (!newGroup) throw new HttpException(400, "Update is not success");
    return newGroup;
  }

  public async getAllGroup(): Promise<IGroup[]> {
    const groups = GroupSchema.find().exec();
    return groups;
  }

  public async getAllMember(groupId: string): Promise<IUser[]> {
    const groups = await GroupSchema.findById(groupId).exec();
    if (!groups) throw new HttpException(400, "Group id is not exists");
    const userIds = await groups.members.map((member) => {
      return member.user;
    });
    const users = UserSchema.find({ _id: userIds }).select("-password").exec();
    return users;
  }

  public async deleteGroup(groupId: string): Promise<IGroup> {
    const group = await GroupSchema.findById(groupId).exec();
    if (!group) throw new HttpException(400, "Group is not exists");

    const deleteGroup = await GroupSchema.findOneAndDelete({
      _id: groupId,
    }).exec();
    if (!deleteGroup) throw new HttpException(400, "Delete is not success");
    return deleteGroup;
  }
  public async joinGroup(groupId: string, userId: string): Promise<IGroup> {
    const group = await GroupSchema.findById(groupId).exec();
    if (!group) throw new HttpException(400, "Group is not exists");
    const user = await UserSchema.findById(userId).select("-password").exec();
    if (!user) throw new HttpException(400, "User is not exists");
    //check da join
    const hasReq = group.member_requests.some(
      (mem) => mem.user.toString() === userId
    );
    if (hasReq)
      throw new HttpException(
        400,
        "You has already sent join request to this group"
      );
    const hasJoined = group.members.some(
      (mem) => mem.user.toString() === userId
    );
    if (hasJoined)
      throw new HttpException(400, "You r already been a member of this group");
    //set lai group
    group.member_requests.unshift({ user: userId } as IMember);
    await group.save();
    return group;
  }
  public async acceptJoin(groupId: string, userId: string): Promise<IGroup> {
    const group = await GroupSchema.findById(groupId).exec();
    if (!group) throw new HttpException(400, "Group is not exists");
    const user = await UserSchema.findById(userId).select("-password").exec();
    if (!user) throw new HttpException(400, "User is not exists");
    //check da join
    const hasReq = group.member_requests.some(
      (mem) => mem.user.toString() == userId
    );
    if (!hasReq)
      throw new HttpException(
        400,
        "There is not any join request of this user"
      );
    const hasJoined = group.members.some(
      (mem) => mem.user.toString() == userId
    );
    if (hasJoined)
      throw new HttpException(
        400,
        "This user is already been member of this group"
      );
    //set lai group
    group.member_requests = group.member_requests.filter(({ user }) => {
      user.toString() !== userId;
      console.log(user.toString(), userId);
    });
    group.members.unshift({ user: userId } as IMember);
    await group.save();
    return group;
  }
  public async addManager(
    groupId: string,
    request: SetManagerDto
  ): Promise<IGroup> {
    const group = await GroupSchema.findById(groupId).exec();
    if (!group) throw new HttpException(400, "Group is not exists");
    const user = await UserSchema.findById(request.userId)
      .select("-password")
      .exec();
    if (!user) throw new HttpException(400, "User is not exists");
    //check da join
    const hasReq = group.managers.some(
      (mem) => mem.user.toString() === request.userId
    );
    if (hasReq)
      throw new HttpException(
        400,
        "You r already been a manager of this group"
      );
    //set lai group
    group.managers.unshift({
      user: request.userId,
      role: request.role,
    } as IManager);
    await group.save();
    return group;
  }
  public async removeManager(groupId: string, userId: string): Promise<IGroup> {
    const group = await GroupSchema.findById(groupId).exec();
    if (!group) throw new HttpException(400, "Group is not exists");
    const user = await UserSchema.findById(userId).select("-password").exec();
    if (!user) throw new HttpException(400, "User is not exists");
    //check da join
    const hasReq = group.managers.some((mem) => mem.user.toString() !== userId);
    if (hasReq)
      throw new HttpException(
        400,
        "You r not been a manager of this group yet"
      );
    //set lai group
    group.managers = group.managers.filter(
      ({ user }) => user.toString() !== userId
    );
    await group.save();
    return group;
  }
}
