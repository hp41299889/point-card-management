import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, prisma } from "@/utils/server";
import { PostGame } from "./interface";
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
          const games =
            showable && showable === "true"
              ? await prisma.game.findMany({ where: { showable: true } })
              : await prisma.game.findMany();
          return res.status(200).json({
            status: "success",
            message: "read games success",
            data: games,
          });
        } catch (err) {
          console.error("GET users error", err);
          return res.status(400).json({
            status: "failed",
            message: "read games failed",
            data: null,
          });
        }
      }
      case "POST": {
        const { body }: { body: PostGame } = req;
        const { ...payload } = body;
        try {
          const createdGame = await prisma.game.create({
            data: { ...payload },
          });
          return createdGame
            ? res.status(201).json({
                status: "success",
                message: "create game success",
                data: createdGame,
              })
            : res.status(400).json({
                status: "failed",
                message: "create game failed",
                data: null,
              });
        } catch (err) {
          console.error("POST game error", err);
          return res.status(400).json({
            status: "failed",
            message: "create game failed",
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
