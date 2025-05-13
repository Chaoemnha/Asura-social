import authMiddleware from "@core/middleware/auth.middleware";
import ProfileController from "./profile.controller";
import { validatorMiddleware } from "@core/middleware";
import CreateProfileDto from "./create_profile.dto";
import { Route } from "@core/interfaces";
import { Router } from "express";

export default class ProfileRoute implements Route {
  public path = "/api/v1/profile";
  public router = Router();
  public profileController = new ProfileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.profileController.getAllProfiles);
    this.router.get(
      `${this.path}/user/:id`,
      this.profileController.getByUserId
    );
    this.router.get(
      `${this.path}/me`,
      authMiddleware,
      this.profileController.getCurrentProfile
    );
    this.router.post(
      `${this.path}`,
      authMiddleware,
      validatorMiddleware(CreateProfileDto),
      this.profileController.createProfile
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      this.profileController.deleteProfile
    );
  }
}
