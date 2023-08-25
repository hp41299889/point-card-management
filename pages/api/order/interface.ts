export interface Order extends PostOrder {
  [key: string]: any;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostOrder extends PatchOrder {
  amount: number;
  cost: string;
  price: number;
  status: string;
  userId: number;
  paymentId: number;
  machineId: number;
  productId: number;
  customerId: number;
}

export interface PatchOrder {
  amount?: number;
  cost?: string;
  price?: number;
  status?: string;
  note?: string;
  userId?: number;
  paymentId?: number;
  machineId?: number;
  productId?: number;
  customerId?: number;
}
