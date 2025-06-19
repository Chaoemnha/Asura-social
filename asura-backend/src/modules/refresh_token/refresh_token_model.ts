import mongoose, { Schema, HydratedDocument } from "mongoose";
import IRefreshToken from "./refresh_token_interface";

const RefreshTokenSchema = new Schema<IRefreshToken>({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  token: String,
  expires: Date,
  created: { type: Date, default: Date.now },
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replaceByToken: String,
});

RefreshTokenSchema.virtual("isExpired").get(function (this: IRefreshToken) {
  return Date.now() >= this.expires.getTime();
});

RefreshTokenSchema.virtual("isActive").get(function (
  this: IRefreshToken & { isExpired: boolean }
) {
  return !this.revoked && !this.isExpired;
});

export type RefreshTokenDocument = HydratedDocument<IRefreshToken>;

export default mongoose.model<IRefreshToken>(
  "refreshToken",
  RefreshTokenSchema
);
