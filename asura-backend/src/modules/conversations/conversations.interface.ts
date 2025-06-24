export interface IConversation {
  user1: string;
  user2: string;
  date: Date;
  recent_date: Date;
  messages: IMessage[];
}

export interface IMessage {
  from: string;
  to: string;
  read: boolean;
  text: string;
  date: Date;
  //tinh nang an tin nhan
  show_on_from: boolean;
  show_on_to: boolean;
}
