import UserSchema from './user.model';
import RegisterDto from './dtos/register.dtos';
import { DataStoredInToken, TokenData } from '@modules/auth';
import { isEmptyObject } from '@core/utils';
import { HttpException } from '@core/exceptions';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import IUser from './user.interface';
import jwt from 'jsonwebtoken';
class UserService{
    public userSchema = UserSchema;
    public async createUser(model: RegisterDto): Promise<TokenData>{
        if(isEmptyObject(model)){
            throw new HttpException(400, "Model is empty")
        }

        const user = await this.userSchema.findOne({email: model.email});
        if(user){
            throw new HttpException(409, `Your email ${model.email} already exist. `)
        }
        //Ket noi gravatar
        const avatar = gravatar.url(model.email!, {
            size: '200',
            rating: 'g',
            default: 'mm'
        });
        //Bam source ra thanh sorce 10 ki tu => add bcryptjs
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = bcryptjs.hash(model.password!, salt);
        const createdUser: IUser = await this.userSchema.create({
            ...model,
            password: hashedPassword,
            avatar: avatar,
            date: Date.now(),
        });
        return this.createToken(createdUser);//Sau cung thi return token
        }
        //Tao ham token data
        private createToken(user: IUser): TokenData{
            const dataInToken: DataStoredInToken = {id: user._id};//Gan bien thi dung ngoac nhon
            const secret:string = process.env.JWT_TOKEN_SECRET!;
            const expriesIn: number = 3600;
            return {
                token: jwt.sign(dataInToken, secret, {expiresIn: expriesIn}),//Den day phai bam, => add jsonwebtoken de no bam ra jwt token 
                
            }
        }
}
export default UserService;