import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, prisma } from "@/utils/server";

import { PatchOrder } from "./interface";
import { authMiddleware } from "@/utils/server/middleware/auth";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  try {
    const { method, query } = req;
    const uid = String(query.uid);
    switch (method) {
      case "GET": {
        try {
          const order = await prisma.order.findFirst({ where: { uid } });
          return order
            ? res.status(200).json({
                status: "success",
                message: "read order by id success",
                data: order,
              })
            : res.status(400).json({
                status: "failed",
                message: "read order by id not found",
                data: null,
              });
        } catch (err) {
          console.error("GET order by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "read order by id failed",
            data: null,
          });
        }
      }
      case "PATCH": {
        const { body }: { body: PatchOrder } = req;
        const { ...payload } = body;
        try {
          const updatedOrder = await prisma.order.update({
            where: { uid },
            data: { ...payload },
          });
          return updatedOrder
            ? res.status(200).json({
                status: "success",
                message: "update order by id success",
                data: updatedOrder,
              })
            : res.status(400).json({
                status: "failed",
                message: "update order by id failed",
                data: null,
              });
        } catch (err) {
          console.error("PATCH order by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "update order by id failed",
            data: null,
          });
        }
      }
      case "DELETE": {
        try {
          const deletedOrder = await prisma.order.delete({
            where: { uid },
          });
          return deletedOrder
            ? res.status(200).json({
                status: "success",
                message: "delete order by id success",
                data: deletedOrder,
              })
            : res.status(400).json({
                status: "failed",
                message: "delete order by id failed",
                data: null,
              });
        } catch (err) {
          console.error("DELETE order by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "delete order by id failed",
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
