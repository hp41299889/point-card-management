import { PostAuth } from "@/pages/api/auth/interface";
import { api } from "./request";

export const postAuth = async (payload: PostAuth) => {
  return api.post("/auth", payload);
};
