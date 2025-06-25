import authMiddleware from "@core/middleware/auth.middleware";
import ProfileController from "./profile.controller";
import { validatorMiddleware } from "@core/middleware";
import CreateProfileDto from "./dtos/create_profile.dto";
import { Route } from "@core/interfaces";
import { Router } from "express";
import AddExperienceDto from "./dtos/add_experience.dto";
import AddEducationDto from "./dtos/add_education.dto";

export default class ProfileRoute implements Route {
  public path = "/api/profile";
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
    this.router.put(
      `${this.path}/experience`,
      authMiddleware,
      validatorMiddleware(AddExperienceDto),
      this.profileController.createExperience
    );
    this.router.delete(
      `${this.path}/experience/:exp_id`,
      authMiddleware,
      this.profileController.deleteExperience
    );
    this.router.put(
      `${this.path}/education`,
      authMiddleware,
      validatorMiddleware(AddEducationDto),
      this.profileController.createEducation
    );
    this.router.delete(
      `${this.path}/education/:edu_id`,
      authMiddleware,
      this.profileController.deleteEducation
    );
    this.router.put(
      `${this.path}/follow/:id`,
      authMiddleware,
      this.profileController.follow
    );
    this.router.delete(
      `${this.path}/follow/:id`,
      authMiddleware,
      this.profileController.unfollow
    );
    this.router.put(
      `${this.path}/request/:id`,
      authMiddleware,
      this.profileController.addFriendReq
    );
    this.router.delete(
      `${this.path}/request/:id`,
      authMiddleware,
      this.profileController.cancelFriendReq
    );
    this.router.put(
      `${this.path}/friend/:id`,
      authMiddleware,
      this.profileController.acceptFriend
    );
    this.router.delete(
      `${this.path}/friend/:id`,
      authMiddleware,
      this.profileController.removeFriend
    );
  }
}
