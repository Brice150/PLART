export interface User {
    id: number;
    email: string;
    enabled: boolean;
    nickname: string;
    locked: boolean;
    password: string;
    userRole: string;
}