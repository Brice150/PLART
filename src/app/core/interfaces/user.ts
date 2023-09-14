import { Authority } from './authority';
import { Message } from './message';
import { Object } from './object';
import { Token } from './token';

export interface User {
  id: number;
  email: string;
  enabled: boolean;
  nickname: string;
  locked: boolean;
  password: string;
  tokens: Token[];
  userRole: string;
  objects: Object[];
  messagesSent: Message[];
  messagesReceived: Message[];
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  username: string;
  accountNonLocked: boolean;
  authorities: Authority[];
  messagesNumber: number;
}
