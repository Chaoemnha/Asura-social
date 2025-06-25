import { HttpException } from "@core/exceptions";
import { GroupSchema } from ".";
import CreateGroupDto from "./dtos/create_group_dto";
import { IGroup } from "./groups.interface";
import { UserSchema } from "@modules/users";

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

  public async deleteGroup(groupId: string): Promise<IGroup> {
    const group = await GroupSchema.findById(groupId).exec();
    if (!group) throw new HttpException(400, "Group is not exists");

    const deleteGroup = await GroupSchema.findOneAndDelete({
      _id: groupId,
    }).exec();
    if (!deleteGroup) throw new HttpException(400, "Delete is not success");
    return deleteGroup;
  }
}
