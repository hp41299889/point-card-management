export interface Payment extends PostPayment {
  [key: string]: any;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostPayment extends PatchPayment {
  name: string;
}

export interface PatchPayment {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  name?: string;
  description?: string;
  note?: string;
}
