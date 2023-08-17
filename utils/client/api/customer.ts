import { api } from "./request";
import { PostCustomer, PatchCustomer } from "@/pages/api/customer/interface";

const route = "/customer";

export const getCustomers = async () => {
  return api.get(route);
};

export const postCustomer = async (payload: PostCustomer) => {
  return api.post(route, payload);
};

export const patchCustomerById = async (id: number, payload: PatchCustomer) => {
  return api.patch(`${route}/${id}`, payload);
};

export const deleteCustomerById = async (id: number) => {
  return api.delete(`${route}/${id}`);
};
