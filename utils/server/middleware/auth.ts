import { verify } from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.JWT_SECRET ? process.env.JWT_SECRET : "jwt";

export const authMiddleware = (handler: any) => async (req: any, res: any) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).end();
    return;
  }

  return verify(token, SECRET) ? handler(req, res) : res.status(401).end();
};
