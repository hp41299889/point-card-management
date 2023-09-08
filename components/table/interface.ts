import { ReactNode } from "react";

export type TableDatas<T> = Array<T> | T[];

export interface TableMetadata {
  key: string;
  label: string;
  preDisplay?: (value: any) => string | number | ReactNode;
  width?: string;
}
