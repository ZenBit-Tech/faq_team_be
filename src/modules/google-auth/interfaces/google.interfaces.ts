export interface IGoogleAuth {
  user: IGoogleUser;
}

export interface IGoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
}

export interface IGoogleAuthRes {
  accessToken: string;
  authAction: string;
}
