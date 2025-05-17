import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export default class AddEducationDto {
  @IsString()
  @IsOptional()
  public _id?: string;

  @IsString()
  @IsNotEmpty()
  public school!: string;

  @IsString()
  @IsNotEmpty()
  public degree!: string;

  @IsString()
  @IsNotEmpty()
  public fieldofstudy!: string;

  @IsDateString()
  @IsNotEmpty()
  public from!: Date;

  @IsDateString()
  @IsNotEmpty()
  public to!: Date;

  @IsBoolean()
  @IsNotEmpty()
  public current!: boolean;

  @IsString()
  @IsOptional()
  public description?: string;
}
