import { IsEmail, IsNotEmpty } from "class-validator";

export default class RegisterDto{
    constructor(first_name: string, last_name: string, email: string, password: string)
    {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }
    
    @IsNotEmpty()
    first_name?: string;

    @IsNotEmpty()
    last_name?: string;

    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsNotEmpty({always: true})
    //Co the them @MinLength(6) de quan ly do dai
    password?: string;
}