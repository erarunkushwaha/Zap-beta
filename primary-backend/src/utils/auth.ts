import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { JWTPayload } from "../types";
import { Secret } from "jsonwebtoken";

// Password hashing utilities
export const passwordUtils = {
  // Hash a plain text password
  // Uses bcrypt with salt rounds (10 is a good balance of security and performance)
  hash: async (password: string): Promise<string> => {
    const saltRounds = 10; // Higher = more secure but slower
    return await bcrypt.hash(password, saltRounds);
  },

  // Compare a plain text password with a hashed password
  // Returns true if they match, false otherwise
  compare: async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
  },
};

// JWT token utilities
export const tokenUtils = {
  // Generate an access token (short-lived, used for authentication)
  generateAccessToken: (payload: JWTPayload): string => {
    const accessSecret: Secret = config.jwt.accessSecret; // Secret key for signing

    // Validate secret
    if (!accessSecret) {
      throw new Error("JWT accessSecret is missing");
    }

    return jwt.sign(payload, accessSecret, {
      expiresIn: Number(config.jwt.accessExpiry), // Expiration time (15m)
    });
  },

  // Generate a refresh token (long-lived, used to get new access tokens)
  generateRefreshToken: (payload: JWTPayload): string => {
    const refreshSecret: Secret = config.jwt.refreshSecret; // Secret key for signing

    // Validate secret
    if (!refreshSecret) {
      throw new Error("JWT refreshSecret is missing");
    }

    return jwt.sign(
      payload,
      refreshSecret,
      { expiresIn: Number(config.jwt.refreshExpiry) } // Expiration time (7d)
    );
  },

  // Verify and decode an access token
  verifyAccessToken: (token: string): JWTPayload => {
    const accessSecret: Secret = config.jwt.accessSecret; // Secret key for signing

    // Validate secret
    if (!accessSecret) {
      throw new Error("JWT accessSecret is missing");
    }

    try {
      // jwt.verify throws an error if token is invalid or expired
      return jwt.verify(token, accessSecret) as JWTPayload;
    } catch (error) {
      // Re-throw with a more specific error message
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Access token has expired");
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid access token");
      }
      throw error;
    }
  },

  // Verify and decode a refresh token
  verifyRefreshToken: (token: string): JWTPayload => {
    const refreshSecret: Secret = config.jwt.refreshSecret; // Secret key for signing

    // Validate secret
    if (!refreshSecret) {
      throw new Error("JWT refreshSecret is missing");
    }

    try {
      return jwt.verify(token, refreshSecret) as JWTPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Refresh token has expired");
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid refresh token");
      }
      throw error;
    }
  },

  // Calculate expiration date for refresh token storage
  getRefreshTokenExpiry: (): Date => {
    const expiry = config.jwt.refreshExpiry;
    const now = new Date();

    // Parse expiry string (e.g., "7d" = 7 days)
    if (expiry.endsWith("d")) {
      const days = parseInt(expiry);
      now.setDate(now.getDate() + days);
    } else if (expiry.endsWith("h")) {
      const hours = parseInt(expiry);
      now.setHours(now.getHours() + hours);
    } else if (expiry.endsWith("m")) {
      const minutes = parseInt(expiry);
      now.setMinutes(now.getMinutes() + minutes);
    }

    return now;
  },
};
