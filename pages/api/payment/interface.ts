export interface Payment extends PostPayment {
  [key: string]: any;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostPayment extends PatchPayment {
  name: string;
  description?: string;
  note?: string;
}

export interface PatchPayment {
  name?: string;
  description?: string;
  note?: string;
}
