import { User } from "./user";

export interface Message {
    id: number;
    content: string;
    date: Date;
    isRead: boolean;
    fkReader: User;
    fkSender: User;
}