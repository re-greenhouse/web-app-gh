
export interface RegisterRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  invitationCode: string | null;
}