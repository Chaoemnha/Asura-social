import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export default class AddExperienceDto {
  @IsString()
  @IsOptional()
  public _id?: string;

  @IsString()
  @IsNotEmpty()
  public current!: boolean;

  @IsString()
  @IsNotEmpty()
  public title!: string;

  @IsString()
  @IsNotEmpty()
  public company!: string;

  @IsString()
  @IsOptional()
  public location?: string;

  @IsDateString()
  @IsNotEmpty()
  public from!: Date;

  @IsDateString()
  @IsOptional()
  public to?: Date;

  @IsString()
  @IsOptional()
  public description?: string;
}
