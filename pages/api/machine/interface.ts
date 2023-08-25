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
  name?: string;
  note?: string;
}
