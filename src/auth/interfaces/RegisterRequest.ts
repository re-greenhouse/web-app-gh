
export interface RegisterRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  invitationCode?: string;
}

export interface RegisterCompanyRequest {
  name: string;
  tin: string;
  logoUrl?: string;
}