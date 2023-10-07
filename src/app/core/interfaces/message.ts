export interface Message {
  id: number;
  content: string;
  date: Date;
  fkSender: any;
  sender: string | null;
}
