import { Request, Response, NextFunction } from 'express';
import UserService from './auth.service';
import LoginDto from './auth.dto';
import { TokenData } from '@modules/auth';
export default class AuthController {
    private userService = new UserService();
    public login = async (req: Request, res: Response, next: NextFunction) =>{
        try {
            const model: LoginDto = req.body;
            const tokenData: TokenData = await this.userService.login(model);//Ở đây tokenData sẽ có kiểu TokenData nhưng ta ép kiểu thế kia nhìn nó tường minh hơn thôi
            res.status(200).json(tokenData); 
        } catch (error) {  
            next(error);
        }
    }
}