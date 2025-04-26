import { NextFunction, Request, Response, response } from "express";

import { DataStoredInToken } from "./../../modules/auth/auth.interface";
import jwt from "jsonwebtoken";

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
      process.env.JWT_TOKEN_SECRET!
    ) as unknown;

    const user = decodedToken as DataStoredInToken;

    if (!res.locals.user) res.locals.user = { id: "" };

    res.locals.user.id = user.id;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
