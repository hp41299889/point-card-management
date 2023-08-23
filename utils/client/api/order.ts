import { api } from "./request";
import { PostOrder, PatchOrder } from "@/pages/api/order/interface";

const route = "/order";

export const getOrders = async (query?: object) => {
  return api.get(route, { params: query });
};

export const postOrder = async (payload: PostOrder) => {
  return api.post(route, payload);
};

export const patchOrderByUid = async (uid: string, payload: PatchOrder) => {
  return api.patch(`${route}/${uid}`, payload);
};

export const deleteOrderByUid = async (uid: string) => {
  return api.delete(`${route}/${uid}`);
};
