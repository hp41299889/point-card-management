import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, prisma } from "@/utils/server";
import { PostPayment } from "./interface";
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
          const payments =
            showable && showable === "ture"
              ? await prisma.payment.findMany({ where: { showable: true } })
              : await prisma.payment.findMany();
          return res.status(200).json({
            status: "success",
            message: "read payments success",
            data: payments,
          });
        } catch (err) {
          console.error("GET users error", err);
          return res.status(400).json({
            status: "failed",
            message: "read payments failed",
            data: null,
          });
        }
      }
      case "POST": {
        const { body }: { body: PostPayment } = req;
        const { ...payload } = body;
        try {
          const createdPayment = await prisma.payment.create({
            data: { ...payload },
          });
          return createdPayment
            ? res.status(201).json({
                status: "success",
                message: "create payment success",
                data: createdPayment,
              })
            : res.status(400).json({
                status: "failed",
                message: "create payment failed",
                data: null,
              });
        } catch (err) {
          console.error("POST payment error", err);
          return res.status(400).json({
            status: "failed",
            message: "create payment failed",
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
