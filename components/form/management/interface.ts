export type FormType = "create" | "watch" | "edit" | "delete";

export interface FormProps {
  open: boolean;
  type: FormType;
  data: any;
  onClose: () => void;
  afterAction: () => Promise<void>;
}
