import { Router } from "express";
import { viewOrders, updateOrder, deleteOrder } from "../controllers/orderControllers";
import { authenticateJWT, authorizeRoles } from "../middleware/auth";
import { tokenBucketRateLimiter } from "../middleware/rateLimit";
import { UserRole } from "../types";

const router = Router();

// All routes protected and rate-limited
router.get("/view", authenticateJWT, tokenBucketRateLimiter, viewOrders);
// router.get("/create", authenticateJWT, tokenBucketRateLimiter, viewOrders);
router.put("/update", authenticateJWT, tokenBucketRateLimiter, authorizeRoles(UserRole.MANAGER, UserRole.ADMIN), updateOrder);
router.delete("/delete", authenticateJWT, tokenBucketRateLimiter, authorizeRoles(UserRole.ADMIN), deleteOrder);

export default router;
