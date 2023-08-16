import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

import { ApiResponse, prisma } from "@/utils/server";
import { PostUser } from "./interface";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  try {
    const { method } = req;
    switch (method) {
      case "GET": {
        try {
          const users = await prisma.user.findMany();
          return users.length > 0
            ? res.status(200).json({
                status: "success",
                message: "read users success",
                data: users,
              })
            : res.status(400).json({
                status: "failed",
                message: "users not found",
                data: users,
              });
        } catch (err) {
          console.error("GET users error", err);
          return res.status(400).json({
            status: "failed",
            message: "read users failed",
            data: null,
          });
        }
      }
      case "POST": {
        const { body }: { body: PostUser } = req;
        const { password, ...payload } = body;
        try {
          const createdUser = await prisma.user.create({
            data: { ...payload, password: await hash(password, 10) },
          });
          return createdUser
            ? res.status(201).json({
                status: "success",
                message: "create user success",
                data: createdUser,
              })
            : res.status(400).json({
                status: "failed",
                message: "create user failed",
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
