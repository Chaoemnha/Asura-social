import { Request, Response, NextFunction } from "express";
import ConversationService from "./conversations.service";
import SendMessageDto from "./dtos/send_message_dto";
export default class ConversationController {
  private conversationService = new ConversationService();

  public creatConversation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.user.id;
      const model: SendMessageDto = req.body;
      const result = await this.conversationService.sendMessage(userId, model); //Ở đây tokenData sẽ có kiểu TokenData nhưng ta ép kiểu thế kia nhìn nó tường minh hơn thôi
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
