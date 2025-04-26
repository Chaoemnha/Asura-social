import { Router } from "express";
import { Route } from "@core/interfaces";
import UsersController from "./user.controller";
import { validatorMiddleware } from "@core/middleware";
import RegisterDto from "./dtos/register.dtos";

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
  }
}
