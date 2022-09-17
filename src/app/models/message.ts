export interface Message {
    id: number;
    content: string;
    date: Date;
    isRead: boolean;
    fromUser: string;
    toUser: string;
    fkReceiver: any;
    fkSender: any;
}