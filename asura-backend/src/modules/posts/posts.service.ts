import { UserSchema } from "@modules/users";
import CreatePostDto from "./dtos/create_post.dto";
import { IPost } from "./posts.interface";
import { HttpException } from "@core/exceptions";
import { PostSchema } from ".";
import { IPagination } from "@core/interfaces";

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
}
