import { DataStoredInToken, TokenData } from "@modules/auth";
import { UserSchema, IUser } from "@modules/users";
import { isEmptyObject } from "@core/utils";
import { HttpException } from "@core/exceptions";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import LoginDto from "./auth.dto";
import { token } from "morgan";
import { generateJwtToken, randomTokenString } from "@core/utils/helpers";
import { IRefreshToken, RefreshTokenSchema } from "@modules/refresh_token";
import Logger from "@core/utils/logger";
import { RefreshTokenDocument } from "@modules/refresh_token/refresh_token_model";
import { HydratedDocument } from "mongoose";
class AuthService {
  public userSchema = UserSchema;
  public async login(model: LoginDto): Promise<TokenData> {
    const user = await this.userSchema.findOne({ email: model.email });
    if (isEmptyObject(model)) {
      throw new HttpException(400, "Model is empty");
    }
    if (user)
      if (!user.password)
        throw new HttpException(400, "User password is missing");

    if (!user) {
      throw new HttpException(409, `Your email ${model.email} already exist. `);
    }
    const isMatchPassword = await bcryptjs.compare(
      model.password,
      user.password
    );
    if (!isMatchPassword)
      throw new HttpException(400, "Credential is not valid");
    const refreshToken: HydratedDocument<IRefreshToken> =
      await this.generateRefreshToken(user._id);
    console.log("user._id", typeof user._id, user._id);
    const jwtToken = generateJwtToken(user._id, refreshToken.token);
    await refreshToken.save();
    return jwtToken; //Sau cung thi return token
  }

  public async getCurrentLoginUser(userId: string): Promise<IUser> {
    const user = await this.userSchema.findById(userId).exec();
    if (!user) {
      throw new HttpException(404, "User is not exists");
    }
    return user;
  }

  public async refreshToken(token: string): Promise<TokenData> {
    const refreshToken = await this.getRefreshTokenFromDb(token);
    const user = refreshToken;
    //thay RT cu va luu lai
    const newRefreshToken = await this.generateRefreshToken(
      user._id.toString()
    );
    refreshToken.revoked = new Date(Date.now());
    refreshToken.replaceByToken = newRefreshToken.token;
    await refreshToken.save();
    await newRefreshToken.save();
    return generateJwtToken(user.user._id.toString(), newRefreshToken.token);
  }

  public async revokeToken(token: string): Promise<void> {
    const refreshToken = await this.getRefreshTokenFromDb(token);
    //revoke token va luu no
    refreshToken.revoked = new Date(Date.now());
    await refreshToken.save();
  }

  //Tao ham token data
  private createToken(user: IUser): TokenData {
    const dataInToken: DataStoredInToken = { id: user._id }; //Gan bien thi dung ngoac nhon
    const secret: string = process.env.JWT_TOKEN_SECRET!;
    const expriesIn: number = 3600;
    return {
      token: jwt.sign(dataInToken, secret, { expiresIn: expriesIn }), //Den day phai bam, => add jsonwebtoken de no bam ra jwt token
      refreshToken: "",
    };
  }

  private async generateRefreshToken(userId: string) {
    //Tao RT het han 7 ngay
    return new RefreshTokenSchema({
      user: userId,
      token: randomTokenString(),
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  }

  private async getRefreshTokenFromDb(refreshToken: string) {
    const token = await RefreshTokenSchema.findOne({ token: refreshToken })
      .populate("user")
      .exec();
    Logger.info(token);
    if (!token || !token.isActive)
      throw new HttpException(400, "Invalid refresh token");
    return token;
  }
}

export default AuthService;
