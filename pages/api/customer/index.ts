import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, prisma } from "@/utils/server";
import { PostCustomer } from "./interface";
import { authMiddleware } from "@/utils/server/middleware/auth";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  try {
    const {
      method,
      query: { showable },
    } = req;
    switch (method) {
      case "GET": {
        try {
          const customers =
            showable && showable === "true"
              ? await prisma.customer.findMany({
                  where: {
                    showable: true,
                  },
                })
              : await prisma.customer.findMany();
          return res.status(200).json({
            status: "success",
            message: "read customers success",
            data: customers,
          });
        } catch (err) {
          console.error("GET users error", err);
          return res.status(400).json({
            status: "failed",
            message: "read customers failed",
            data: null,
          });
        }
      }
      case "POST": {
        const { body }: { body: PostCustomer } = req;
        const { ...payload } = body;
        try {
          const createdCustomer = await prisma.customer.create({
            data: { ...payload },
          });
          return createdCustomer
            ? res.status(201).json({
                status: "success",
                message: "create customer success",
                data: createdCustomer,
              })
            : res.status(400).json({
                status: "failed",
                message: "create customer failed",
                data: null,
              });
        } catch (err) {
          console.error("POST customer error", err);
          return res.status(400).json({
            status: "failed",
            message: "create customer failed",
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
