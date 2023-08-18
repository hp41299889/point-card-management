import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, prisma } from "@/utils/server";
import { PostOrder } from "./interface";
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
          const orders = await prisma.order.findMany({
            include: {
              payment: true,
              product: {
                include: {
                  game: true,
                },
              },
              customer: true,
              machine: true,
            },
          });
          return res.status(200).json({
            status: "success",
            message: "read orders success",
            data: orders,
          });
        } catch (err) {
          console.error("GET users error", err);
          return res.status(400).json({
            status: "failed",
            message: "read orders failed",
            data: null,
          });
        }
      }
      case "POST": {
        const { body }: { body: PostOrder } = req;
        const { ...payload } = body;
        console.log(payload);

        try {
          const createdOrder = await prisma.order.create({
            data: { ...payload },
          });
          return createdOrder
            ? res.status(201).json({
                status: "success",
                message: "create order success",
                data: createdOrder,
              })
            : res.status(400).json({
                status: "failed",
                message: "create order failed",
                data: null,
              });
        } catch (err) {
          console.error("POST order error", err);
          return res.status(400).json({
            status: "failed",
            message: "create order failed",
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
