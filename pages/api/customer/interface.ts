export interface Customer extends PostCustomer {
  [key: string]: any;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostCustomer extends PatchCustomer {
  name: string;
  description?: string;
  note?: string;
}

export interface PatchCustomer {
  name?: string;
  description?: string;
  note?: string;
}
