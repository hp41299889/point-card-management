export interface User extends PostUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostUser extends PatchUser {
  name: string;
  username: string;
  password: string;
  admin: boolean;
}

export interface PatchUser {
  name?: string;
  username?: string;
  password?: string;
}
