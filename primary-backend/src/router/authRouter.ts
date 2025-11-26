import { Router } from "express";
import {
  signup,
  login,
  refreshAccessToken,
  logout,
  logoutAll,
  getProfile,
} from "../controller/authController";
import { authenticate } from "../middleware/authMiddleware";

import { validate } from "../middleware/validation/validationMiddleware";
import {
  loginSchema,
  refreshTokenSchema,
  signupSchema,
} from "../validation/authValidation";

// Create a new router instance
const router = Router();

// Public routes (no authentication required)

// POST /api/auth/signup - Register a new user
// Flow: Validate input -> Create user -> Hash password -> Generate tokens
router.post("/signup", validate(signupSchema), signup);

// POST /api/auth/login - Login existing user
// Flow: Validate input -> Find user -> Verify password -> Generate tokens
router.post("/login", validate(loginSchema), login);

// POST /api/auth/refresh - Get new access token using refresh token
// Flow: Validate refresh token -> Verify token -> Generate new access token
router.post("/refresh", validate(refreshTokenSchema), refreshAccessToken);

// POST /api/auth/logout - Logout from current device
// Flow: Validate refresh token -> Delete refresh token from database
router.post("/logout", validate(refreshTokenSchema), logout);

// Protected routes (authentication required)

// POST /api/auth/logout-all - Logout from all devices
// Flow: Authenticate user -> Delete all refresh tokens for this user
router.post("/logout-all", authenticate, logoutAll);

// GET /api/auth/profile - Get current user profile
// Flow: Authenticate user -> Fetch user data -> Return profile
router.get("/profile", authenticate, getProfile);

export const authRouter = router;
