import { Request, Response, NextFunction } from "express";
import { TokenData } from "@modules/auth";
import GroupService from "./groups.service";
import CreateGroupDto from "./dtos/create_group_dto";
export default class GroupController {
  private groupService = new GroupService();

  public createGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreateGroupDto = req.body;
      const result = await this.groupService.createGroup(
        res.locals.user.id,
        model
      ); //Ở đây tokenData sẽ có kiểu TokenData nhưng ta ép kiểu thế kia nhìn nó tường minh hơn thôi
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groups = await this.groupService.getAllGroup();
      res.status(200).json(groups);
    } catch (error) {
      next(error);
    }
  };
}
