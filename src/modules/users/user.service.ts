import UserSchema from "./user.model";
import RegisterDto from "./dtos/register.dtos";
import { DataStoredInToken, TokenData } from "@modules/auth";
import { isEmptyObject } from "@core/utils";
import { HttpException } from "@core/exceptions";
import gravatar from "gravatar";
import bcryptjs from "bcryptjs";
import IUser from "./user.interface";
import jwt from "jsonwebtoken";
import { IPagination } from "@core/interfaces";
class UserService {
  public userSchema = UserSchema;
  public async createUser(model: RegisterDto): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const user = await this.userSchema.findOne({ email: model.email });
    if (user) {
      throw new HttpException(409, `Your emai ${model.email} already exist. `);
    }
    //Ket noi gravatar
    const avatar = gravatar.url(model.email!, {
      size: "200",
      rating: "g",
      default: "mm",
    });
    //Bam source ra thanh source 10 ki tu => add bcryptjs
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(model.password!, salt); //Day la 1 promise nen phai dung await
    const createdUser: IUser = await this.userSchema.create({
      ...model,
      password: hashedPassword,
      avatar: avatar,
      date: Date.now(),
    });
    return this.createToken(createdUser); //Sau cung thi return token
  }
  public async updateUser(userId: string, model: RegisterDto): Promise<IUser> {
    if (isEmptyObject(model)) {
      //Co model khong
      throw new HttpException(400, "Model is empty");
    }

    const user = await this.userSchema.findById(userId).exec();
    if (!user) {
      //Id ton tai khong
      throw new HttpException(400, `User id is not exist. `);
    }
    let avatar = user.avatar; //De neu mail ms ko co avt thi dung cai nay
    //ktra email truyen vao bi giong email user cu
    if (user.email == model.email) {
      throw new HttpException(400, `You must using the different email`);
    } else {
      avatar = gravatar.url(model.email!, {
        size: "200",
        rating: "g",
        default: "mm",
      });
    }
    let updateUserById;
    if (model.password) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(model.password, salt);
      updateUserById = await this.userSchema
        .findByIdAndUpdate(userId, {
          ...model,
          avatar: avatar,
          password: hashedPassword,
        })
        .exec();
    } else {
      //Neu co pass thi cap nhat pass ko thi thoi
      updateUserById = await this.userSchema
        .findByIdAndUpdate(userId, {
          ...model,
          avatar: avatar,
        })
        .exec();
    }
    if (!updateUserById) {
      throw new HttpException(409, "You are not an user");
    }
    return updateUserById; //Xong roi them cac dieu khien trong controller
  }

  public async getUserById(userId: string): Promise<IUser> {
    const user = await this.userSchema.findById(userId).exec();
    if (!user) {
      throw new HttpException(404, "User is not exists");
    }
    return user;
  }

  //Tao ham token data
  private createToken(user: IUser): TokenData {
    const dataInToken: DataStoredInToken = { id: user._id }; //Gan bien thi dung ngoac nhon
    const secret: string = process.env.JWT_TOKEN_SECRET!;
    const expriesIn: number = 3600;
    return {
      token: jwt.sign(dataInToken, secret, { expiresIn: expriesIn }), //Den day phai bam, => add jsonwebtoken de no bam ra jwt token
    };
  }

  public async getAll(): Promise<IUser[]> {
    const users = await this.userSchema.find().exec();
    return users;
  }

  public async getAllPaging(
    keyword: string,
    page: number
  ): Promise<IPagination<IUser>> {
    const pageSize: number = Number(process.env.PAGE_SIZE) || 10;

    // Tạo query cho việc tìm kiếm
    const searchQuery = keyword
      ? {
          $or: [
            { email: keyword },
            { first_name: keyword },
            { last_name: keyword },
          ],
        }
      : {};

    // Thực thi query để lấy danh sách người dùng
    const users = await this.userSchema
      .find(searchQuery)
      .sort({ date: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    // Thực thi query để đếm tổng số tài liệu
    const rowCount = await this.userSchema.countDocuments(searchQuery).exec();

    return {
      total: rowCount,
      page,
      pageSize,
      items: users,
    };
  }
}

export default UserService;
