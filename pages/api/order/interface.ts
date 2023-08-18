import { Customer } from "../customer/interface";
import { Machine } from "../machine/interface";
import { Payment } from "../payment/interface";
import { Product } from "../product/interface";
import { User } from "../user/interface";

export interface Order extends PostOrder {
  [key: string]: any;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  payment: Payment;
  machine: Machine;
  product: Product;
  customer: Customer;
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
  cost?: string;
  price?: number;
  status?: string;
  description?: string;
  note?: string;
  userId?: number;
  paymentId?: number;
  machineId?: number;
  productId?: number;
  customerId?: number;
}
