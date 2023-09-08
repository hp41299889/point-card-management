import { api } from "./request";
import { PatchUser, PostUser } from "@/pages/api/user/interface";

const route = "/user";

export const getUsers = async () => {
  return api.get(route);
};

export const getUsersUnshowable = async () => {
  return api.get(`${route}?showable=true`);
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
