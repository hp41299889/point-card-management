import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, prisma } from "@/utils/server";

import { PatchProduct } from "./interface";

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
          const product = await prisma.product.findFirst({ where: { id } });
          return product
            ? res.status(200).json({
                status: "success",
                message: "read product by id success",
                data: product,
              })
            : res.status(400).json({
                status: "failed",
                message: "read product by id not found",
                data: null,
              });
        } catch (err) {
          console.error("GET product by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "read product by id failed",
            data: null,
          });
        }
      }
      case "PATCH": {
        const { body }: { body: PatchProduct } = req;
        const { ...payload } = body;
        try {
          const updatedProduct = await prisma.product.update({
            where: { id },
            data: { ...payload },
          });
          return updatedProduct
            ? res.status(200).json({
                status: "success",
                message: "update product by id success",
                data: updatedProduct,
              })
            : res.status(400).json({
                status: "failed",
                message: "update product by id failed",
                data: null,
              });
        } catch (err) {
          console.error("PATCH product by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "update product by id failed",
            data: null,
          });
        }
      }
      case "DELETE": {
        try {
          const deletedProduct = await prisma.product.delete({
            where: { id },
          });
          return deletedProduct
            ? res.status(200).json({
                status: "success",
                message: "delete product by id success",
                data: deletedProduct,
              })
            : res.status(400).json({
                status: "failed",
                message: "delete product by id failed",
                data: null,
              });
        } catch (err) {
          console.error("DELETE product by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "delete product by id failed",
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
