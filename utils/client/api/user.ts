import { PatchUser, PostUser } from "@/pages/api/user/interface";
import { api } from "./request";

const route = "/user";

export const getUsers = async () => {
  return api.get(route);
};

export const postUser = async (payload: PostUser) => {
  return api.post(route, payload);
};

export const patchUserById = async (id: number, payload: PatchUser) => {
  return api.patch(`${route}/${id}`, payload);
};

export const deleteUserById = async (id: number) => {
  return api.delete(`${route}/${id}`);
};
