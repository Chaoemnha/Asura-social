import { Request, Response, NextFunction } from "express";
import { TokenData } from "@modules/auth";
import PostService from "./posts.service";
import CreatePostDto from "./dtos/create_post.dto";
import { IPost } from "./posts.interface";
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

  public getAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const posts: IPost[] = await this.postService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  };

  public getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const post = await this.postService.getPostById(id);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  };

  public getAllPaging = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page: number = Number(req.params.page);
      const keyword = req.query.keyword || "";
      const paginationResult = await this.postService.getAllPaging(
        keyword.toString(),
        page
      );
      res.status(200).json(paginationResult);
    } catch (error) {
      next(error);
    }
  };

  public deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postId = req.params.id;
      const post = await this.postService.deletePost(
        res.locals.user.id,
        postId
      );
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  };

  public likePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const likes = await this.postService.likePost(res.locals.user.id, postId);
      res.status(200).json(likes);
    } catch (error) {
      next(error);
    }
  };

  public unlikePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postId = req.params.id;
      const likes = await this.postService.unLikePost(
        res.locals.user.id,
        postId
      );
      res.status(200).json(likes);
    } catch (error) {
      next(error);
    }
  };

  public addComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postId = req.params.postid;
      const result = await this.postService.addComment({
        text: req.body.text,
        userId: res.locals.user.id,
        postId: postId,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public removeComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const postId = req.params.postid;
      const commentId = req.params.commentid;
      console.log("postId", postId);
      console.log("commentId", commentId);
      const result = await this.postService.removeComment(
        commentId,
        postId,
        res.locals.user.id
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
