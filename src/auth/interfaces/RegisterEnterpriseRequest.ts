export interface RegisterEnterpriseRequest {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    invitationCode?: string;
    name: string;
    tin: string;
  }