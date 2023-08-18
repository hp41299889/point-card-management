import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, prisma } from "@/utils/server";
import { PatchCustomer } from "./interface";
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
          const customer = await prisma.customer.findFirst({ where: { id } });
          return customer
            ? res.status(200).json({
                status: "success",
                message: "read customer by id success",
                data: customer,
              })
            : res.status(400).json({
                status: "failed",
                message: "read customer by id not found",
                data: null,
              });
        } catch (err) {
          console.error("GET customer by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "read customer by id failed",
            data: null,
          });
        }
      }
      case "PATCH": {
        const { body }: { body: PatchCustomer } = req;
        const { id, createdAt, updatedAt, ...payload } = body;
        try {
          const updatedCustomer = await prisma.customer.update({
            where: { id },
            data: { ...payload },
          });
          return updatedCustomer
            ? res.status(200).json({
                status: "success",
                message: "update customer by id success",
                data: updatedCustomer,
              })
            : res.status(400).json({
                status: "failed",
                message: "update customer by id failed",
                data: null,
              });
        } catch (err) {
          console.error("PATCH customer by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "update customer by id failed",
            data: null,
          });
        }
      }
      case "DELETE": {
        try {
          const deletedCustomer = await prisma.customer.delete({
            where: { id },
          });
          return deletedCustomer
            ? res.status(200).json({
                status: "success",
                message: "delete customer by id success",
                data: deletedCustomer,
              })
            : res.status(400).json({
                status: "failed",
                message: "delete customer by id failed",
                data: null,
              });
        } catch (err) {
          console.error("DELETE customer by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "delete customer by id failed",
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
