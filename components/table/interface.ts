import { ReactNode, Dispatch, SetStateAction } from "react";

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
