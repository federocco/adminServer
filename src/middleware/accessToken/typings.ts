export type AccessTokenRequest = {
  id: number;
  username: string;
  type: string;
  email: string;
  companyId: number;
};

export interface AccessToken extends AccessTokenRequest {
  apiEndpoint: string;
}
