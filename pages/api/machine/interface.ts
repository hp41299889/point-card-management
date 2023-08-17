export interface Machine extends PostMachine {
  [key: string]: any;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostMachine extends PatchMachine {
  name: string;
  description?: string;
  note?: string;
}

export interface PatchMachine {
  name?: string;
  description?: string;
  note?: string;
}
