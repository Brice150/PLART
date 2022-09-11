import { User } from "./user";

export interface Message {
    id: number;
    content: string;
    date: Date;
    isRead: boolean;
    fromUser: string;
    toUser: string;
    fkReader: User;
    fkSender: User;
}