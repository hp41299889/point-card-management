export interface User extends PostUser {
  [key: string]: any;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostUser extends PatchUser {
  name: string;
  username: string;
  password: string;
  admin: boolean;
  note?: string;
  showable: boolean;
}

export interface PatchUser {
  name?: string;
  username?: string;
  password?: string;
  admin?: boolean;
  note?: string;
  showable?: boolean;
}
