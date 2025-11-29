import { Request, Response, NextFunction } from "express";
import { tryConsume, getBucketInfo } from "../services/rateLimitService";

/**
 * Per-user token bucket rate limiter middleware.
 * For unauthenticated users, uses IP fallback key.
 */
export function tokenBucketRateLimiter(req: Request, res: Response, next: NextFunction) {
  const key = req.user?.username ?? req.ip;
  const result = tryConsume(key, 1);

  // Set helpful headers
  const info = getBucketInfo(key);
  res.setHeader("X-RateLimit-Limit", info.maxTokens.toString());
  res.setHeader("X-RateLimit-Remaining", result.remaining.toString());

  if (!result.ok) {
    return res.status(429).json({
      success: false,
      message: "Too Many Requests",
      remaining: result.remaining
    });
  }
  next();
}
