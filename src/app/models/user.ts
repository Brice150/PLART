export interface User {
    id: number;
    email: string;
    enabled: boolean;
    firstName: string;
    lastName: string;
    locked: boolean;
    password: string;
    userRole: string;
}