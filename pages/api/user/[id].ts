import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, prisma } from "@/utils/server";
import { PatchUser } from "./interface";
import { hash } from "bcrypt";
import { authMiddleware } from "@/utils/server/middleware/auth";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  try {
    const { method, query } = req;
    const id = Number(query.id);
    switch (method) {
      case "GET": {
        try {
          const user = await prisma.user.findFirst({ where: { id } });
          return user
            ? res.status(200).json({
                status: "success",
                message: "read user by id success",
                data: user,
              })
            : res.status(400).json({
                status: "failed",
                message: "read user by id not found",
                data: null,
              });
        } catch (err) {
          console.error("GET user by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "read user by id failed",
            data: null,
          });
        }
      }
      case "PATCH": {
        const { body }: { body: PatchUser } = req;
        if (body.password) {
          body.password = await hash(body.password, 10);
        }
        const { ...payload } = body;
        try {
          const updatedUser = await prisma.user.update({
            where: { id },
            data: { ...payload },
          });
          return updatedUser
            ? res.status(200).json({
                status: "success",
                message: "update user by id success",
                data: updatedUser,
              })
            : res.status(400).json({
                status: "failed",
                message: "update user by id failed",
                data: null,
              });
        } catch (err) {
          console.error("PATCH user by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "update user by id failed",
            data: null,
          });
        }
      }
      case "DELETE": {
        try {
          const deletedUser = await prisma.user.delete({
            where: { id },
          });
          return deletedUser
            ? res.status(200).json({
                status: "success",
                message: "delete user by id success",
                data: deletedUser,
              })
            : res.status(400).json({
                status: "failed",
                message: "delete user by id failed",
                data: null,
              });
        } catch (err) {
          console.error("DELETE user by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "delete user by id failed",
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

export default authMiddleware(handler);
