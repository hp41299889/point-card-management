import { api } from "./request";
import { PostOrder, PatchOrder } from "@/pages/api/order/interface";

const route = "/order";

export const getOrders = async () => {
  return api.get(route);
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
