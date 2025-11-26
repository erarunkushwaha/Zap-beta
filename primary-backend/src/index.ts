import express from "express";

import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { config } from "./config";
import { authRouter } from "./router/authRouter";
import { userRouter } from "./router/userRouter";
import { zapRouter } from "./router/zapRouter";
import { mylogger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorMiddleware";

import dotenv from "dotenv";
dotenv.config();

const app = express();

// ============================================================================
// SECURITY MIDDLEWARE
// ============================================================================

// Helmet: Sets various HTTP headers for security
// Protects against common vulnerabilities like XSS, clickjacking, etc.
app.use(helmet());

// CORS: Enable Cross-Origin Resource Sharing
// Allows frontend applications from different origins to access this API
// app.use(cors({
//   origin: config.cors.allowedOrigins,  // Only allow specified origins
//   credentials: true,                    // Allow cookies and auth headers
// }));

// Rate limiting: Prevents brute force and DDoS attacks
// Limits each IP to 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
});

// Apply rate limiting to all routes
app.use(limiter);

// Stricter rate limiting for authentication routes
// 5 attempts per 15 minutes to prevent brute force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many authentication attempts, please try again later.",
  skipSuccessfulRequests: true, // Don't count successful requests
});

// ============================================================================
// BODY PARSING MIDDLEWARE
// ============================================================================

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies (from HTML forms)
app.use(express.urlencoded({ extended: true }));

app.use(mylogger);
app.use(cors());

// ============================================================================
// ROUTES
// ============================================================================

// Health check endpoint
// Useful for monitoring and load balancers
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Authentication routes with rate limiting
app.use("/api/v1/auth", authLimiter, authRouter);

// User routes
app.use("/api/v1/user", userRouter);

// Zap routes
app.use("/api/v1/zap", zapRouter);

// 404 handler for unknown routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

// Global error handler (must be last middleware)
app.use(errorHandler);

// ============================================================================
// START SERVER
// ============================================================================
const PORT = config.port;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Auth Server Running                                   ║
║                                                            ║
║   Environment: ${config.nodeEnv.padEnd(44)}║
║   Port:        ${String(PORT).padEnd(44)}║
║   URL:         http://localhost:${PORT}${" ".repeat(28)}║
║                                                            ║
║   API Endpoints:                                           ║
║   • POST   /api/auth/signup       - Register new user     ║
║   • POST   /api/auth/login        - Login user            ║
║   • POST   /api/auth/refresh      - Refresh access token  ║
║   • POST   /api/auth/logout       - Logout (single)       ║
║   • POST   /api/auth/logout-all   - Logout (all devices)  ║
║   • GET    /api/auth/profile      - Get user profile      ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing HTTP server...");
  process.exit(0);
});

export default app;
