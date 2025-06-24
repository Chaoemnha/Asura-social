import { Router } from "express";
import { Route } from "@core/interfaces";
import { validatorMiddleware } from "@core/middleware";
import authMiddleware from "@core/middleware/auth.middleware";
import CreateGroupDto from "./dtos/create_group_dto";
import GroupController from "./groups.controller";

export default class GroupRoute implements Route {
  public path = "/api/groups";
  public router = Router();
  public groupsController = new GroupController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      this.path,
      authMiddleware,
      validatorMiddleware(CreateGroupDto, true),
      this.groupsController.createGroup
    );
    this.router.put(
      this.path + "/:id",
      authMiddleware,
      validatorMiddleware(CreateGroupDto, true),
      this.groupsController.updateGroup
    );
    this.router.delete(
      this.path + "/:id",
      authMiddleware,
      this.groupsController.deleteGroup
    );
    this.router.get(this.path, this.groupsController.getAll);
  }
}
