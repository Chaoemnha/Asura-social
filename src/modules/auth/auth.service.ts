import { DataStoredInToken, TokenData } from "@modules/auth";
import { UserSchema, IUser } from "@modules/users";
import { isEmptyObject } from "@core/utils";
import { HttpException } from "@core/exceptions";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import LoginDto from "./auth.dto";
class AuthService {
  public userSchema = UserSchema;
  public async login(model: LoginDto): Promise<TokenData> {
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }

    const user = await this.userSchema.findOne({ email: model.email });
    if (!user) {
      throw new HttpException(409, `Your email ${model.email} already exist. `);
    }
    if (!user.password)
      throw new HttpException(400, "User password is missing");
    const isMatchPassword = await bcryptjs.compare(
      model.password,
      user.password
    );
    if (!isMatchPassword)
      throw new HttpException(400, "Credential is not valid");
    return this.createToken(user); //Sau cung thi return token
  }

  public async getCurrentLoginUser(userId: string): Promise<IUser> {
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
}

export default AuthService;
