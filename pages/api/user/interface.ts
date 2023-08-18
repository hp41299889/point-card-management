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
  description?: string;
  note?: string;
}

export interface PatchUser {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  username?: string;
  password?: string;
  admin?: boolean;
  description?: string;
  note?: string;
}
