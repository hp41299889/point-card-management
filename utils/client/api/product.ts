import { api } from "./request";
import { PostProduct, PatchProduct } from "@/pages/api/product/interface";

const route = "/product";

export const getProducts = async () => {
  return api.get(route);
};

export const postProduct = async (payload: PostProduct) => {
  return api.post(route, payload);
};

export const patchProductById = async (id: number, payload: PatchProduct) => {
  return api.patch(`${route}/${id}`, payload);
};

export const deleteProductById = async (id: number) => {
  return api.delete(`${route}/${id}`);
};
