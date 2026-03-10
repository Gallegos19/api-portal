import { NextFunction, Request, Response } from 'express';

type KeyGenerator = (req: Request) => string;
type SkipPredicate = (req: Request) => boolean;

interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
  message?: string;
  keyGenerator?: KeyGenerator;
  skip?: SkipPredicate;
}

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const defaultKeyGenerator: KeyGenerator = (req) => req.ip || 'unknown-ip';

export const createRateLimitMiddleware = (options: RateLimitOptions) => {
  const {
    windowMs,
    maxRequests,
    message = 'Too many requests, please try again later.',
    keyGenerator = defaultKeyGenerator,
    skip,
  } = options;

  if (windowMs <= 0) {
    throw new Error('rateLimit windowMs must be greater than 0');
  }

  if (maxRequests <= 0) {
    throw new Error('rateLimit maxRequests must be greater than 0');
  }

  const store = new Map<string, RateLimitEntry>();

  // Periodic cleanup to avoid unbounded memory usage for stale keys.
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now - entry.windowStart >= windowMs) {
        store.delete(key);
      }
    }
  }, windowMs);

  cleanupTimer.unref();

  return (req: Request, res: Response, next: NextFunction) => {
    if (skip?.(req)) {
      next();
      return;
    }

    const key = keyGenerator(req);
    const now = Date.now();
    const existing = store.get(key);

    if (!existing || now - existing.windowStart >= windowMs) {
      store.set(key, { count: 1, windowStart: now });

      res.setHeader('X-RateLimit-Limit', maxRequests.toString());
      res.setHeader('X-RateLimit-Remaining', (maxRequests - 1).toString());
      res.setHeader('X-RateLimit-Reset', Math.ceil((now + windowMs) / 1000).toString());

      next();
      return;
    }

    existing.count += 1;

    const remaining = Math.max(maxRequests - existing.count, 0);
    const resetAt = existing.windowStart + windowMs;

    res.setHeader('X-RateLimit-Limit', maxRequests.toString());
    res.setHeader('X-RateLimit-Remaining', remaining.toString());
    res.setHeader('X-RateLimit-Reset', Math.ceil(resetAt / 1000).toString());

    if (existing.count > maxRequests) {
      const retryAfterSeconds = Math.max(Math.ceil((resetAt - now) / 1000), 1);
      res.setHeader('Retry-After', retryAfterSeconds.toString());
      res.status(429).json({ message });
      return;
    }

    next();
  };
};
