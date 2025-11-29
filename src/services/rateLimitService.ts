import config from "../config";

/**
 * Token bucket per user identified by a string key (username).
 * Refill is continuous based on elapsed time.
 */

type Bucket = {
  tokens: number;
  lastRefill: number; // epoch ms
};

const buckets = new Map<string, Bucket>();

const { maxTokens, refillRate, refillIntervalMs } = config.rateLimiting;

/**
 * Refill logic: tokens += (elapsedMs / refillIntervalMs) * refillRate
 */
function refill(bucket: Bucket) {
  const now = Date.now();
  const elapsed = now - bucket.lastRefill;
  if (elapsed <= 0) return;
  const refillAmount = (elapsed / refillIntervalMs) * refillRate;
  bucket.tokens = Math.min(maxTokens, bucket.tokens + refillAmount);
  bucket.lastRefill = now;
}

export function initBucketIfNeeded(key: string) {
  if (!buckets.has(key)) {
    buckets.set(key, { tokens: maxTokens, lastRefill: Date.now() });
  }
}

export function tryConsume(key: string, cost = 1): { ok: boolean; remaining: number } {
  initBucketIfNeeded(key);
  const bucket = buckets.get(key)!;
  refill(bucket);
  if (bucket.tokens >= cost) {
    bucket.tokens -= cost;
    return { ok: true, remaining: Math.floor(bucket.tokens) };
  } else {
    return { ok: false, remaining: Math.floor(bucket.tokens) };
  }
}

export function getBucketInfo(key: string) {
  initBucketIfNeeded(key);
  const bucket = buckets.get(key)!;
  refill(bucket);
  return {
    tokens: Math.floor(bucket.tokens),
    lastRefill: bucket.lastRefill,
    maxTokens
  };
}
