import axios, { AxiosInstance } from "axios";

const request = (baseURL = ""): AxiosInstance => {
  const instance = axios.create({
    baseURL,
  });
  return instance;
};

export const api = request("/api");
