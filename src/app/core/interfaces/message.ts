export interface Message {
    id: number;
    content: string;
    date: Date;
    fromUser: string;
    toUser: string;
    fkReceiver: any;
    fkSender: any;
}