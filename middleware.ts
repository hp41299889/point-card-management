import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "./utils/server";

const authRoutes = [
  "/api/user",
  "/api/payment",
  "/api/customer",
  "/api/machine",
  "/api/game",
  "/api/product",
  "/api/order",
];

export const middleware = (req: NextRequest) => {
  if (authRoutes.includes(req.nextUrl.pathname)) {
    const token = req.headers.get("Authorization");
    if (!token) {
      return new NextResponse<ApiResponse>(
        JSON.stringify({
          status: "failed",
          message: "authorization failed",
          data: null,
        }),
        { status: 401 }
      );
    }
  }
};
