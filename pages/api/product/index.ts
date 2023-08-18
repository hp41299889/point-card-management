import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, prisma } from "@/utils/server";
import { PostProduct } from "./interface";
import { authMiddleware } from "@/utils/server/middleware/auth";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  try {
    const { method } = req;
    switch (method) {
      case "GET": {
        const { query } = req;
        const gameId = Number(query.gameId);
        if (gameId) {
          try {
            const products = await prisma.product.findMany({
              where: { gameId },
            });
            return res.status(200).json({
              status: "success",
              message: "read products by gameId success",
              data: products,
            });
          } catch (err) {
            console.error("GET users error", err);
            return res.status(400).json({
              status: "failed",
              message: "read products by gameId failed",
              data: null,
            });
          }
        } else {
          try {
            const products = await prisma.product.findMany({
              include: {
                game: true,
              },
            });
            return res.status(200).json({
              status: "success",
              message: "read products success",
              data: products,
            });
          } catch (err) {
            console.error("GET products error", err);
            return res.status(400).json({
              status: "failed",
              message: "read products failed",
              data: null,
            });
          }
        }
      }
      case "POST": {
        const { body }: { body: PostProduct } = req;
        const { ...payload } = body;
        try {
          const createdProduct = await prisma.product.create({
            data: { ...payload },
          });
          return createdProduct
            ? res.status(201).json({
                status: "success",
                message: "create product success",
                data: createdProduct,
              })
            : res.status(400).json({
                status: "failed",
                message: "create product failed",
                data: null,
              });
        } catch (err) {
          console.error("POST product error", err);
          return res.status(400).json({
            status: "failed",
            message: "create product failed",
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
