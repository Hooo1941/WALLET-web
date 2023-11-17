type APIResponse<T> = {
  code: number;
  msg: string;
  body?: T;
};

type RegisterStruct = {
  username?: string;
  nickname?: string;
  password?: string;
};

type LoginStruct = {
  username?: string;
  password?: string;
};

type TokenResponse = APIResponse<string>;

type User = {
  nickname: string;
  token: string;
};

type UserResponse = APIResponse<User>;

type ProfileStruct = {
  token: string;
};

type Profile = {
  meta: {
    ID: number;
    CreateAt: string;
  };
  user_name: string;
  nick_name: string;
  role: number;
  is_enabled: boolean;
};

type Token = {
  id: number;
  role: number;
};

type ProfileResponse = APIResponse<Profile>;
