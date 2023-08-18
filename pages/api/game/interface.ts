export interface Game extends PostGame {
  [key: string]: any;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostGame extends PatchGame {
  name: string;
}

export interface PatchGame {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  description?: string;
  note?: string;
}
