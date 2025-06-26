import { IsEmail, IsNotEmpty } from "class-validator";

export default class LoginDto{
    constructor(email: string, password: string)
    {
        this.email = email;
        this.password = password;
    }
    
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsNotEmpty({always: true})
    //Co the them @MinLength(6) de quan ly do dai
    password: string;
}