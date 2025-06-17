import { Router } from "express";
import { Route } from "@core/interfaces";
import UsersController from "./user.controller";
import { validatorMiddleware } from "@core/middleware";
import RegisterDto from "./dtos/register.dtos";
import authMiddleware from "@core/middleware/auth.middleware";

export default class UsersRoute implements Route {
  public path = "/api/users";
  public router = Router();
  public usersController = new UsersController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      this.path,
      validatorMiddleware(RegisterDto, true),
      this.usersController.register
    ); //POST: http://localhost:5000/api/users
    this.router.put(
      this.path + "/:id",
      validatorMiddleware(RegisterDto, true),
      this.usersController.updateUser
    ); //update=>dung put
    this.router.get(this.path + "/:id", this.usersController.getUserById); //find
    this.router.get(this.path, this.usersController.getAll);
    this.router.get(
      this.path + "/paging/:page/",
      this.usersController.getAllPaging
    );
    this.router.delete(
      this.path + "/:id",
      authMiddleware,
      this.usersController.deleteUser
    );
    this.router.delete(
      this.path,
      authMiddleware,
      this.usersController.deleteUsers
    );
  }
}
