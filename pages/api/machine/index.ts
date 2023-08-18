import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, prisma } from "@/utils/server";
import { PostMachine } from "./interface";
import { authMiddleware } from "@/utils/server/middleware/auth";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  try {
    const { method } = req;
    switch (method) {
      case "GET": {
        try {
          const machines = await prisma.machine.findMany();
          return res.status(200).json({
            status: "success",
            message: "read machines success",
            data: machines,
          });
        } catch (err) {
          console.error("GET users error", err);
          return res.status(400).json({
            status: "failed",
            message: "read machines failed",
            data: null,
          });
        }
      }
      case "POST": {
        const { body }: { body: PostMachine } = req;
        const { ...payload } = body;
        try {
          const createdMachine = await prisma.machine.create({
            data: { ...payload },
          });
          return createdMachine
            ? res.status(201).json({
                status: "success",
                message: "create machine success",
                data: createdMachine,
              })
            : res.status(400).json({
                status: "failed",
                message: "create machine failed",
                data: null,
              });
        } catch (err) {
          console.error("POST machine error", err);
          return res.status(400).json({
            status: "failed",
            message: "create machine failed",
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
