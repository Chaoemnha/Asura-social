import { IsNotEmpty } from "class-validator";

export default class createCommentDto {
  @IsNotEmpty()
  public text: string | undefined;
  @IsNotEmpty()
  public userId: string | undefined;
  @IsNotEmpty()
  public postId: string | undefined;
}
