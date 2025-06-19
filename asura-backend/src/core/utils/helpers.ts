import { DataStoredInToken, TokenData } from "@core/interfaces";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const isEmptyObject = (obj: object): boolean => {
  return !Object.keys(obj).length; //Co the dung luôn vào code nma ta lại thích tách ra ngô ra khoai :v
};

export const randomTokenString = (): string => {
  //random ra refresh token
  return crypto.randomBytes(40).toString("hex");
};

export const createToken = (
  userId: string,
  refreshToken: string
): TokenData => {
  const dataInToken: DataStoredInToken = { id: userId };
  const secret: string = process.env.JWT_TOKEN_SECRET ?? "";
  const expiresIn = 3600;
  return {
    token: jwt.sign(dataInToken, secret, { expiresIn: expiresIn }),
    refreshToken: refreshToken,
  };
};

export const generateJwtToken = (
  userId: string,
  refreshToken: string
): TokenData => {
  console.log("userId", userId);
  const dataInToken: DataStoredInToken = { id: userId };
  const secret: string = process.env.JWT_TOKEN_SECRET ?? "";
  const expiresIn = 60;
  return {
    token: jwt.sign(dataInToken, secret, { expiresIn: expiresIn }),
    refreshToken: refreshToken,
  };
};
