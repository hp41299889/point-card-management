import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

import { ApiResponse } from "./utils/server";
import { verifyAuth } from "./utils/server/auth";

const SECRET = process.env.JWT_SECRET || "jwt_secret";

const authRoutes = [
  "/api/user",
  "/api/payment",
  "/api/customer",
  "/api/machine",
  "/api/game",
  "/api/product",
  "/api/order",
];

export const middleware = async (req: NextRequest) => {
  if (authRoutes.includes(req.nextUrl.pathname)) {
    const verifiedToken = await verifyAuth(req).catch((err) => {
      console.error(err);
    });

    if (!verifiedToken) {
      return new NextResponse(
        JSON.stringify({
          status: "failed",
          message: "auth failed",
          data: null,
        }),
        { status: 401 }
      );
    }
  }
};
