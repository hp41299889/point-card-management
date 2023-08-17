import { ReactNode } from "react";

export interface TableMetadata {
  key: string;
  label: string;
  preDisplay?: (value: any) => string | number | ReactNode;
  width?: string;
}

export interface TableHook<T> {
  (): { data: T[]; fetcher: () => Promise<void>; loading: boolean };
}
