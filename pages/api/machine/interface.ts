export interface Machine extends PostMachine {
  [key: string]: any;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostMachine extends PatchMachine {
  name: string;
  showable: boolean;
}

export interface PatchMachine {
  name?: string;
  note?: string;
  showable?: boolean;
}
