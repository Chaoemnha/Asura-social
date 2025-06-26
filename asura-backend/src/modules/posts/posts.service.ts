import { UserSchema } from "@modules/users";
import CreatePostDto from "./dtos/create_post.dto";
import { IComment, ILike, IPost, IShare } from "./posts.interface";
import { HttpException } from "@core/exceptions";
import { PostSchema } from ".";
import { IPagination } from "@core/interfaces";
import createCommentDto from "./dtos/create_comment_dto";
import mongoose from "mongoose";

export default class PostService {
  public async createPost(
    userId: string,
    postDto: CreatePostDto
  ): Promise<IPost> {
    const user = await UserSchema.findById(userId).select("-password").exec();
    if (!user) throw new HttpException(400, "User id is not exists");
    const newPost = new PostSchema({
      text: postDto.text,
      name: user.first_name + " " + user.last_name,
      avatar: user.avatar,
      user: userId,
      likes: [],
      comments: [],
    });
    const post = await newPost.save();
    return post;
  }

  public async updatePost(
    postId: string,
    postDto: CreatePostDto
  ): Promise<IPost> {
    const updatePostById = await PostSchema.findByIdAndUpdate(
      postId,
      {
        ...postDto,
      },
      { new: true }
    ).exec();

    if (!updatePostById) throw new HttpException(400, "Post is not found");
    return updatePostById;
  }

  public async getAllPosts(): Promise<IPost[]> {
    const posts = await PostSchema.find().sort({ date: -1 }).exec();
    return posts;
  }

  public async getPostById(postId: string): Promise<IPost> {
    const post = await PostSchema.findById(postId).exec();
    if (!post) throw new HttpException(400, "Post is not found");
    return post;
  }

  public async getAllPaging(
    keyword: string,
    page: number
  ): Promise<IPagination<IPost>> {
    const pageSize: number = Number(process.env.PAGE_SIZE) || 9;

    // Tạo query cho việc tìm kiếm
    const searchQuery = keyword
      ? {
          $or: [{ text: keyword }],
        }
      : {};

    // Thực thi query để lấy danh sách người dùng
    const posts = await PostSchema.find(searchQuery)
      .sort({ date: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    // Thực thi query để đếm tổng số tài liệu
    const rowCount = await PostSchema.countDocuments(searchQuery).exec();

    return {
      total: rowCount,
      page,
      pageSize,
      items: posts,
    } as IPagination<IPost>;
  }

  public async deletePost(userId: string, postId: string): Promise<IPost> {
    const post = await PostSchema.findById(postId);
    if (!post) throw new HttpException(400, "Post is not found");
    if (post.user.toString() !== userId)
      throw new HttpException(400, "User is not authorized");
    await PostSchema.findByIdAndDelete(postId);
    return post;
  }

  public async likePost(userId: string, postId: string): Promise<ILike[]> {
    const post = await PostSchema.findById(postId).exec();
    if (!post) throw new HttpException(400, "Post is not found");

    if (post.likes.some((like: ILike) => like.user.toString() === userId)) {
      throw new HttpException(400, "Post already liked");
    }
    post.likes.unshift({ user: userId });
    await post.save();
    return post.likes;
  }

  public async unLikePost(userId: string, postId: string): Promise<ILike[]> {
    const post = await PostSchema.findById(postId).exec();
    if (!post) throw new HttpException(400, "Post is not found");
    //Kiem tra xem co bat ki dieu kien phan tu mang nao true (co roi) hay khong
    if (!post.likes.some((like: ILike) => like.user.toString() === userId)) {
      throw new HttpException(400, "You havent liked this post yet");
    }
    post.likes = post.likes.filter(({ user }) => user.toString() !== userId);
    await post.save();
    return post.likes;
  }

  public async makeShare(userId: string, postId: string): Promise<IShare[]> {
    const post = await PostSchema.findById(postId).exec();
    if (!post) throw new HttpException(400, "Post is not found");

    if (
      post.shares &&
      post.shares.some((share: IShare) => share.user.toString() === userId)
    ) {
      throw new HttpException(400, "Post already shared");
    }
    if (!post.shares) post.shares = [];
    post.shares.unshift({ user: userId });
    await post.save();
    return post.shares;
  }

  public async deleteShare(userId: string, postId: string): Promise<IShare[]> {
    const post = await PostSchema.findById(postId).exec();
    if (!post) throw new HttpException(400, "Post is not found");
    //Kiem tra xem co bat ki dieu kien phan tu mang nao true (co roi) hay khong
    if (
      post.shares &&
      !post.shares.some((share: IShare) => share.user.toString() === userId)
    ) {
      throw new HttpException(400, "You havent shared this post yet");
    }
    if (!post.shares) post.shares = [];
    post.shares = post.shares.filter(({ user }) => user.toString() !== userId);
    await post.save();
    return post.shares;
  }

  public async addComment(comment: createCommentDto): Promise<IComment[]> {
    const post = await PostSchema.findById(comment.postId).exec();
    if (!post) throw new HttpException(400, "Post not found");
    const user = await UserSchema.findById(comment.userId)
      .select("-password")
      .exec();
    if (!user) throw new HttpException(400, "User is not found");
    const newComment = {
      _id: new mongoose.Types.ObjectId().toString(),
      user: comment.userId,
      text: comment.text,
      name: user.first_name + " " + user.last_name,
      avatar: user.avatar,
      date: new Date(Date.now()),
    };
    console.log("newComment", newComment);
    console.log("post", post);
    post.comments.unshift(newComment as IComment);
    await post.save();
    return post.comments;
  }

  public async removeComment(
    commentId: string,
    postId: string,
    userId: string
  ): Promise<IComment[]> {
    const post = await PostSchema.findById(postId).exec();
    if (!post) throw new HttpException(400, "Post not found");

    const comment = post.comments.find((x) => x._id === commentId);
    if (!comment) throw new HttpException(400, "Comment is not foung");
    console.log("comment.user", typeof comment.user, comment.user);
    console.log("userId", userId);
    if (comment.user !== userId)
      throw new HttpException(401, "User is not authorized");
    post.comments = post.comments.filter(({ _id }) => _id !== commentId);
    await post.save();
    return post.comments;
  }
}
