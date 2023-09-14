export interface Token {
  id: number;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  confirmedAt: Date;
}
