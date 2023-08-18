export interface Customer extends PostCustomer {
  [key: string]: any;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostCustomer extends PatchCustomer {
  name: string;
}

export interface PatchCustomer {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  description?: string;
  note?: string;
}
