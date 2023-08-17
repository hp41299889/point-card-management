import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, prisma } from "@/utils/server";

import { PatchPayment } from "./interface";

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
          const payment = await prisma.payment.findFirst({ where: { id } });
          return payment
            ? res.status(200).json({
                status: "success",
                message: "read payment by id success",
                data: payment,
              })
            : res.status(400).json({
                status: "failed",
                message: "read payment by id not found",
                data: null,
              });
        } catch (err) {
          console.error("GET payment by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "read payment by id failed",
            data: null,
          });
        }
      }
      case "PATCH": {
        const { body }: { body: PatchPayment } = req;
        const { ...payload } = body;
        try {
          const updatedPayment = await prisma.payment.update({
            where: { id },
            data: { ...payload },
          });
          return updatedPayment
            ? res.status(200).json({
                status: "success",
                message: "update payment by id success",
                data: updatedPayment,
              })
            : res.status(400).json({
                status: "failed",
                message: "update payment by id failed",
                data: null,
              });
        } catch (err) {
          console.error("PATCH payment by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "update payment by id failed",
            data: null,
          });
        }
      }
      case "DELETE": {
        try {
          const deletedPayment = await prisma.payment.delete({
            where: { id },
          });
          return deletedPayment
            ? res.status(200).json({
                status: "success",
                message: "delete payment by id success",
                data: deletedPayment,
              })
            : res.status(400).json({
                status: "failed",
                message: "delete payment by id failed",
                data: null,
              });
        } catch (err) {
          console.error("DELETE payment by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "delete payment by id failed",
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
