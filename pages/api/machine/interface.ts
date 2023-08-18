export interface Machine extends PostMachine {
  [key: string]: any;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostMachine extends PatchMachine {
  name: string;
}

export interface PatchMachine {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  description?: string;
  note?: string;
}
