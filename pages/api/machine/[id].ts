import type { NextApiRequest, NextApiResponse } from "next";

import { ApiResponse, prisma } from "@/utils/server";

import { PatchMachine } from "./interface";

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
          const machine = await prisma.machine.findFirst({ where: { id } });
          return machine
            ? res.status(200).json({
                status: "success",
                message: "read machine by id success",
                data: machine,
              })
            : res.status(400).json({
                status: "failed",
                message: "read machine by id not found",
                data: null,
              });
        } catch (err) {
          console.error("GET machine by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "read machine by id failed",
            data: null,
          });
        }
      }
      case "PATCH": {
        const { body }: { body: PatchMachine } = req;
        const { ...payload } = body;
        try {
          const updatedMachine = await prisma.machine.update({
            where: { id },
            data: { ...payload },
          });
          return updatedMachine
            ? res.status(200).json({
                status: "success",
                message: "update machine by id success",
                data: updatedMachine,
              })
            : res.status(400).json({
                status: "failed",
                message: "update machine by id failed",
                data: null,
              });
        } catch (err) {
          console.error("PATCH machine by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "update machine by id failed",
            data: null,
          });
        }
      }
      case "DELETE": {
        try {
          const deletedMachine = await prisma.machine.delete({
            where: { id },
          });
          return deletedMachine
            ? res.status(200).json({
                status: "success",
                message: "delete machine by id success",
                data: deletedMachine,
              })
            : res.status(400).json({
                status: "failed",
                message: "delete machine by id failed",
                data: null,
              });
        } catch (err) {
          console.error("DELETE machine by id error", err);
          return res.status(400).json({
            status: "failed",
            message: "delete machine by id failed",
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
