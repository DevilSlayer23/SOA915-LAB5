import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import config from "../config";
import type { JwtPayload } from "../types";

export function signToken(payload: JwtPayload): string {
  const options: SignOptions = {
    
  };
  return jwt.sign(payload, config.jwt.secret, options);
}

export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, config.jwt.secret);
  return decoded as JwtPayload;
}