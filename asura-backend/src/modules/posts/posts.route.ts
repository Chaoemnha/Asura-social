import { Router } from "express";
import { Route } from "@core/interfaces";
import { validatorMiddleware } from "@core/middleware";
import authMiddleware from "@core/middleware/auth.middleware";
import PostsController from "./posts.controller";
import CreatePostDto from "./dtos/create_post.dto";

export default class PostsRoute implements Route {
  public path = "/api/posts";
  public router = Router();
  public postsController = new PostsController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      this.path,
      authMiddleware,
      validatorMiddleware(CreatePostDto, true),
      this.postsController.createPost
    ); //POST: http://localhost:5000/api/users
    this.router.put(
      this.path,
      authMiddleware,
      validatorMiddleware(CreatePostDto, true),
      this.postsController.updatePost
    );
  }
}
