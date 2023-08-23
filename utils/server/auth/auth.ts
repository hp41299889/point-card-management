import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

import { SECRET } from "./consts";

export const verifyAuth = async (req: NextRequest) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    throw new Error("bad auth");
  }

  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(SECRET));
    return verified.payload;
  } catch (err) {
    throw new Error("token bad");
  }
};
