
export interface RegisterRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  invitationCode?: string;
}

export interface RegisterCompanyRequest {
  razonSocial: string;
  ruc: string;
}