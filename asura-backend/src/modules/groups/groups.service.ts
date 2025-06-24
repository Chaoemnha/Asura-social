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

  public async getAllGroup(): Promise<IGroup[]> {
    const groups = GroupSchema.find().exec();
    return groups;
  }
}
