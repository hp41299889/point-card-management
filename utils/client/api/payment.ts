import { api } from "./request";
import { PostPayment, PatchPayment } from "@/pages/api/payment/interface";

const route = "/payment";

export const getPayments = async () => {
  return api.get(route);
};

export const getPaymentsUnshowable = async () => {
  return api.get(`${route}?showable=true`);
};

export const postPayment = async (payload: PostPayment) => {
  return api.post(route, payload);
};

export const patchPaymentById = async (id: number, payload: PatchPayment) => {
  return api.patch(`${route}/${id}`, payload);
};

export const deletePaymentById = async (id: number) => {
  return api.delete(`${route}/${id}`);
};
