export interface UserTokenDto {
  accessToken: string;
  user: UserSessionDto;
}

export interface UserSessionDto {
  id: number;
  email: string;
  fullName: string;
}
