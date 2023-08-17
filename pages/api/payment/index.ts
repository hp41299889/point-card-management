import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, prisma } from "@/utils/server";
import { PostPayment } from "./interface";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  try {
    const { method } = req;
    switch (method) {
      case "GET": {
        try {
          const payments = await prisma.payment.findMany();
          return payments.length > 0
            ? res.status(200).json({
                status: "success",
                message: "read payments success",
                data: payments,
              })
            : res.status(400).json({
                status: "failed",
                message: "payment not found",
                data: null,
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

export default handler;
