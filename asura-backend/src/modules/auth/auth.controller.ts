import { Request, Response, NextFunction } from "express";
import UserService from "./auth.service";
import LoginDto from "./auth.dto";
import { AuthService, TokenData } from "@modules/auth";
export default class AuthController {
  private userService = new UserService();
  private authService = new AuthService();
  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: LoginDto = req.body;
      const tokenData: TokenData = await this.userService.login(model); //Ở đây tokenData sẽ có kiểu TokenData nhưng ta ép kiểu thế kia nhìn nó tường minh hơn thôi
      res.status(200).json(tokenData);
    } catch (error) {
      next(error);
    }
  };
  public refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const refreshToken = req.body.refreshToken;
      const tokenData: TokenData = await this.authService.refreshToken(
        refreshToken
      );
      res.status(200).json(tokenData);
    } catch (error) {
      next(error);
    }
  };
  public revokeToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.body.token;
      await this.authService.revokeToken(token);
      res.status(200);
    } catch (error) {
      next(error);
    }
  };
  public getCurrentUserLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.user.id;
      console.log("userId", userId);
      const user = await this.userService.getCurrentLoginUser(userId); //Ở đây tokenData sẽ có kiểu TokenData nhưng ta ép kiểu thế kia nhìn nó tường minh hơn thôi
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
