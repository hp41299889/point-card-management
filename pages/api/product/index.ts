import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, prisma } from "@/utils/server";
import { PostProduct } from "./interface";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) => {
  try {
    const { method } = req;
    switch (method) {
      case "GET": {
        try {
          const products = await prisma.product.findMany({
            include: {
              game: true,
            },
          });
          console.log(products);

          return products.length > 0
            ? res.status(200).json({
                status: "success",
                message: "read products success",
                data: products,
              })
            : res.status(400).json({
                status: "failed",
                message: "product not found",
                data: null,
              });
        } catch (err) {
          console.error("GET users error", err);
          return res.status(400).json({
            status: "failed",
            message: "read products failed",
            data: null,
          });
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

export default handler;
