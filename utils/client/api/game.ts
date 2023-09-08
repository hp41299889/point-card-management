import { api } from "./request";
import { PostGame, PatchGame } from "@/pages/api/game/interface";

const route = "/game";

export const getGames = async () => {
  return api.get(route);
};

export const getGamesUnshowable = async () => {
  return api.get(`${route}?showable=true`);
};

export const postGame = async (payload: PostGame) => {
  return api.post(route, payload);
};

export const patchGameById = async (id: number, payload: PatchGame) => {
  return api.patch(`${route}/${id}`, payload);
};

export const deleteGameById = async (id: number) => {
  return api.delete(`${route}/${id}`);
};
