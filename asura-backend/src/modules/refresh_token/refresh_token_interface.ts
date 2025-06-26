import { Types } from "mongoose";

export default interface IRefreshToken {
  user: Types.ObjectId;
  token: string;
  expires: Date;
  created: Date;
  createdByIp?: string;
  revoked?: Date;
  revokedByIp?: string;
  replaceByToken?: string;

  // Virtuals
  isExpired?: boolean;
  isActive?: boolean;
}
