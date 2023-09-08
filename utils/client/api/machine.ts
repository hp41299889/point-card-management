import { api } from "./request";
import { PostMachine, PatchMachine } from "@/pages/api/machine/interface";

const route = "/machine";

export const getMachines = async () => {
  return api.get(route);
};

export const getMachinesUnshowable = async () => {
  return api.get(`${route}?showable=true`);
};

export const postMachine = async (payload: PostMachine) => {
  return api.post(route, payload);
};

export const patchMachineById = async (id: number, payload: PatchMachine) => {
  return api.patch(`${route}/${id}`, payload);
};

export const deleteMachineById = async (id: number) => {
  return api.delete(`${route}/${id}`);
};
