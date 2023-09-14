export interface Message {
  id: number;
  content: string;
  date: Date;
  fkReceiver: any;
  fkSender: any;
  sender: string | null;
}
