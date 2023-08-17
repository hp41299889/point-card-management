import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, prisma } from "@/utils/server";

import { PatchGame } from "./interface";

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
          const game = await prisma.game.findFirst({ where: { id } });
          return game
            ? res.status(200).json({
                status: "success",
                message: "read game by id success",
                data: game,
              })
            : res.status(400).json({
                status: "failed",
                message: "read game by id not found",
                data: null,
              });
        } catch (err) {
          console.error("GET game by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "read game by id failed",
            data: null,
          });
        }
      }
      case "PATCH": {
        const { body }: { body: PatchGame } = req;
        const { ...payload } = body;
        try {
          const updatedGame = await prisma.game.update({
            where: { id },
            data: { ...payload },
          });
          return updatedGame
            ? res.status(200).json({
                status: "success",
                message: "update game by id success",
                data: updatedGame,
              })
            : res.status(400).json({
                status: "failed",
                message: "update game by id failed",
                data: null,
              });
        } catch (err) {
          console.error("PATCH game by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "update game by id failed",
            data: null,
          });
        }
      }
      case "DELETE": {
        try {
          const deletedGame = await prisma.game.delete({
            where: { id },
          });
          return deletedGame
            ? res.status(200).json({
                status: "success",
                message: "delete game by id success",
                data: deletedGame,
              })
            : res.status(400).json({
                status: "failed",
                message: "delete game by id failed",
                data: null,
              });
        } catch (err) {
          console.error("DELETE game by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "delete game by id failed",
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
