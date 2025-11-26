import dotenv from "dotenv";

// Load environment variables from .env file into process.env
dotenv.config();

// Centralized configuration object
// Makes it easy to access env variables with TypeScript safety
export const config = {
  // Server settings
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",

  // JWT configuration
  jwt: {
    // Secret key for signing access tokens (short-lived)
    accessSecret: process.env.JWT_ACCESS_SECRET || "fallback_access_secret",

    // Secret key for signing refresh tokens (long-lived)
    refreshSecret: process.env.JWT_REFRESH_SECRET || "fallback_refresh_secret",

    // How long tokens are valid
    accessExpiry: process.env.JWT_ACCESS_EXPIRY || "15m", // 15 minutes
    refreshExpiry: process.env.JWT_REFRESH_EXPIRY || "7d", // 7 days
  },

  // CORS configuration
  cors: {
    // Split comma-separated origins into an array
    allowedOrigins: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3000",
    ],
  },
};

// Validation: Ensure critical secrets are set in production
if (config.nodeEnv === "production") {
  if (
    config.jwt.accessSecret === "fallback_access_secret" ||
    config.jwt.refreshSecret === "fallback_refresh_secret"
  ) {
    throw new Error("JWT secrets must be set in production environment!");
  }
}
