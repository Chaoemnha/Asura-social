import { HttpException } from "@core/exceptions";
import { ConversationSchema } from ".";
import { UserSchema } from "@modules/users";
import SendMessageDto from "./dtos/send_message_dto";
import { IConversation, IMessage } from "./conversations.interface";

export default class ConversationService {
  public async sendMessage(
    userId: string,
    dto: SendMessageDto
  ): Promise<IConversation> {
    const user = await UserSchema.findById(userId).select("-password").exec();
    if (!user) throw new HttpException(400, "User id is not exists");
    const toUser = await UserSchema.findById(dto.to).select("-password").exec();
    if (!toUser) throw new HttpException(400, "ToUser id is not exists");
    //Kiem tra, chua co hoi thoai thi tao hoi thoai moi, khong thi them message moi
    if (!dto.conversationId) {
      let newConversation = await ConversationSchema.findOne({
        $or: [
          { $and: [{ user1: userId }, { user2: dto.to }] },
          { $and: [{ user1: dto.to }, { user2: userId }] },
        ],
      }).exec();
      if (newConversation) {
        newConversation.messages.unshift({
          to: dto.to,
          from: userId,
          text: dto.text,
        } as IMessage);
      } else {
        newConversation = new ConversationSchema({
          user1: userId,
          user2: dto.to,
          messages: [
            {
              from: userId,
              to: dto.to,
              text: dto.text,
            },
          ],
        });
      }
      //Luc nao cx phai tao moi thi khong duoc
      await newConversation.save();
      return newConversation;
    } else {
      const conversation = await ConversationSchema.findById(
        dto.conversationId
      ).exec();
      if (!conversation)
        throw new HttpException(400, "Conversation is not exists");
      //Neu co conver id nma la hoi thoai voi nguoi khac, 1 nguoi khac hoac ca 2 deu khac
      //Thi chi can user 1 hoac user 2 khong nam trong from va to, ta dung includes
      if (
        ![userId, dto.to].includes(conversation.user1.toString()) ||
        ![userId, dto.to].includes(conversation.user2.toString())
      ) {
        throw new HttpException(400, "Wrong conversation");
      }
      conversation.messages.unshift({
        to: dto.to,
        text: dto.text,
        from: userId,
      } as IMessage);
      await conversation.save();
      return conversation;
    }
  }
}
