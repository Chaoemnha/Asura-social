import { Router } from "express";
import { Route } from "@core/interfaces";
import { validatorMiddleware } from "@core/middleware";
import authMiddleware from "@core/middleware/auth.middleware";
import ConversationController from "./conversations.controller";
import SendMessageDto from "./dtos/send_message_dto";

export default class ConversationRoute implements Route {
  public path = "/api/conversation";
  public router = Router();
  public conversationController = new ConversationController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      this.path,
      authMiddleware,
      validatorMiddleware(SendMessageDto, true),
      this.conversationController.sendMessage
    );
    this.router.get(
      this.path,
      authMiddleware,
      this.conversationController.getMyConversation
    );
  }
}
