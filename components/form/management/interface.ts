import { FormData } from "../interface";

export type FormType = "create" | "watch" | "edit" | "delete";

export interface FormProps<T> {
  open: boolean;
  type: FormType;
  data: FormData<T>;
  onClose: () => void;
  afterAction: () => Promise<void>;
  fields?: {
    [key: string]: any[];
  };
}
