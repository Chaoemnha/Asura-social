import { IsNotEmpty, IsString } from "class-validator";

export default class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  public text: string | undefined;
}
