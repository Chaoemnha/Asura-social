import { IsNotEmpty } from "class-validator";

export default class createPostDto {
  @IsNotEmpty()
  public name: string | undefined;
  @IsNotEmpty()
  public code: string | undefined;
  @IsNotEmpty()
  public description: string | undefined;
}
