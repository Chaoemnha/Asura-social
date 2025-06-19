import { Request, Response, NextFunction } from "express";
import { TokenData } from "@modules/auth";
import PostService from "./posts.service";
import CreatePostDto from "./dtos/create_post.dto";
export default class PostsController {
  private postService = new PostService();
  public createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreatePostDto = req.body;
      const userId = res.locals.user.id;
      const result = await this.postService.createPost(userId, model); //Ở đây tokenData sẽ có kiểu TokenData nhưng ta ép kiểu thế kia nhìn nó tường minh hơn thôi
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
  public updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const model: CreatePostDto = req.body;
      const postId = req.query.id?.toString() ?? "";
      console.log(postId);
      const result = await this.postService.updatePost(postId, model); //Ở đây tokenData sẽ có kiểu TokenData nhưng ta ép kiểu thế kia nhìn nó tường minh hơn thôi
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
