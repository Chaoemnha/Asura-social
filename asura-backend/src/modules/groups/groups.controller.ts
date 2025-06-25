import { Request, Response, NextFunction } from "express";
import GroupService from "./groups.service";
import CreateGroupDto from "./dtos/create_group_dto";
import SetManagerDto from "./dtos/set_manager_dto";
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
  public deleteGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.id;
      const result = await this.groupService.deleteGroup(groupId); //Ở đây tokenData sẽ có kiểu TokenData nhưng ta ép kiểu thế kia nhìn nó tường minh hơn thôi
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  public updateGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreateGroupDto = req.body;
      const groupId = req.params.id;
      const result = await this.groupService.updateGroup(groupId, model); //Ở đây tokenData sẽ có kiểu TokenData nhưng ta ép kiểu thế kia nhìn nó tường minh hơn thôi
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  public joinGroup = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.user.id;
      const groupId = req.params.id;
      const result = await this.groupService.joinGroup(groupId, userId); //Ở đây tokenData sẽ có kiểu TokenData nhưng ta ép kiểu thế kia nhìn nó tường minh hơn thôi
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  public acceptJoin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.userid;
      const groupId = req.params.id;
      const result = await this.groupService.acceptJoin(groupId, userId); //Ở đây tokenData sẽ có kiểu TokenData nhưng ta ép kiểu thế kia nhìn nó tường minh hơn thôi
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  public addManager = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.id;
      const model: SetManagerDto = req.body;
      const result = await this.groupService.addManager(groupId, model); //Ở đây tokenData sẽ có kiểu TokenData nhưng ta ép kiểu thế kia nhìn nó tường minh hơn thôi
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  public removeManager = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.id;
      const userId = req.params.userid;
      const result = await this.groupService.removeManager(groupId, userId); //Ở đây tokenData sẽ có kiểu TokenData nhưng ta ép kiểu thế kia nhìn nó tường minh hơn thôi
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  public removeMember = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.id;
      const userId = res.locals.user.id;
      const result = await this.groupService.removeMember(groupId, userId); //Ở đây tokenData sẽ có kiểu TokenData nhưng ta ép kiểu thế kia nhìn nó tường minh hơn thôi
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
  public getAllMembers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const groupId = req.params.id;
      const members = await this.groupService.getAllMember(groupId);
      res.status(200).json(members);
    } catch (error) {
      next(error);
    }
  };
}
