import type { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  jwt: {
    secret: (process.env.JWT_SECRET || "change-me") as Secret,
    expiration: (process.env.JWT_EXPIRATION || "1h") as string
  },
  rateLimiting: {
    maxTokens: process.env.RATE_MAX_TOKENS ? Number(process.env.RATE_MAX_TOKENS) : 4,
    refillRate: process.env.RATE_REFILL_RATE ? Number(process.env.RATE_REFILL_RATE) : 4,
    refillIntervalMs: process.env.RATE_REFILL_INTERVAL_MS ? Number(process.env.RATE_REFILL_INTERVAL_MS) : 60000
  }
};
