import { Request, Response, NextFunction } from 'express';
import UserService from './user.service';
import RegisterDto from './dtos/register.dtos';
import { TokenData } from '@modules/auth';
export default class UsersController {
    private userService = new UserService();
    public register = async (req: Request, res: Response, next: NextFunction) =>{
        try {
            const model: RegisterDto = req.body;
            const tokenData: TokenData = await this.userService.createUser(model);//Ở đây tokenData sẽ có kiểu TokenData nhưng ta ép kiểu thế kia nhìn nó tường minh hơn thôi
            res.status(200).json(tokenData); 
        } catch (error) {  
            next(error);
        }
    }
}