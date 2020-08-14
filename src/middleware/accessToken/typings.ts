export interface AccessTokenRequest {
  id: number;
  username: string;
  type: string;
  email: string;
  idazien: number;
}

export interface AccessToken extends AccessTokenRequest {
  apiEndpoint: string;
}
