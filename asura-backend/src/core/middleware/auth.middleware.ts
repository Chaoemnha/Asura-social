import { NextFunction, Request, Response, response } from "express";

import { DataStoredInToken } from "../interfaces/auth.interface";
import jwt from "jsonwebtoken";
import Logger from "@core/utils/logger";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied." });
  }

  try {
    const decodedToken = jwt.verify(
      token as string,
      process.env.JWT_TOKEN_SECRET ?? ""
    ) as unknown;

    const user = decodedToken as DataStoredInToken;

    if (!res.locals.user) res.locals.user = { id: "" };
    console.log("user", user);
    res.locals.user.id = user.id;
    next();
  } catch (error) {
    Logger.error(`[ERROR] Msg: ${token}`);
    // Kiểm tra  error là object khác null và có 'name'
    if (typeof error === "object" && error !== null && "name" in error) {
      if (error.name == "TokenExpiredError") {
        res.status(401).json({ message: "Token is expired" });
      } else {
        res.status(401).json({ message: "Token is not valid" });
      }
    }
  }
};

export default authMiddleware;
