import { ReactNode, Dispatch, SetStateAction } from "react";

import { Customer } from "@/pages/api/customer/interface";
import { Game } from "@/pages/api/game/interface";
import { Machine } from "@/pages/api/machine/interface";
import { Order } from "@/pages/api/order/interface";
import { Payment } from "@/pages/api/payment/interface";
import { Product } from "@/pages/api/product/interface";
import { User } from "@/pages/api/user/interface";

export type TableData =
  | User
  | Customer
  | Payment
  | Machine
  | Product
  | Game
  | Order;

export interface TableMetadata {
  key: string;
  label: string;
  preDisplay?: (value: any) => string | number | ReactNode;
  width?: string;
}

export interface TableHook<T> {
  (): {
    data: T[];
    fetcher: (q?: object) => Promise<void>;
    setData?: Dispatch<SetStateAction<T[]>>;
    loading: boolean;
  };
}
