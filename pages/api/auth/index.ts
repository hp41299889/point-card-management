import type { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";

import { ApiResponse, prisma } from "@/utils/server";
import { PostAuth } from "./interface";
import { SECRET } from "@/utils/server";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  try {
    const { method } = req;
    switch (method) {
      case "POST": {
        const { body }: { body: PostAuth } = req;
        const { username, password } = body;
        try {
          const user = await prisma.user.findFirst({ where: { username } });
          if (!user) {
            return res.status(401).json({
              status: "failed",
              message: "user not found",
              data: null,
            });
          }
          const checked = await compare(password, user.password);
          return checked
            ? res.status(200).json({
                status: "success",
                message: "login success",
                data: {
                  token: await new SignJWT({})
                    .setProtectedHeader({ alg: "HS256" })
                    .setJti(nanoid())
                    .setIssuedAt()
                    .setExpirationTime("2h")
                    .sign(new TextEncoder().encode(SECRET)),
                  user,
                },
              })
            : res.status(401).json({
                status: "failed",
                message: "password incorrect",
                data: null,
              });
        } catch (err) {
          console.error("POST user error", err);
          return res.status(400).json({
            status: "failed",
            message: "create user failed",
            data: null,
          });
        }
      }
      default: {
        return res.status(405).json({
          status: "failed",
          message: "http method not allowed",
          data: null,
        });
      }
    }
  } catch (err) {
    console.error("Handler error", err);
    return res.status(500).json({
      status: "failed",
      message: "server error",
      data: null,
    });
  }
};

export default handler;
