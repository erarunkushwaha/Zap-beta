import { Request, Response, NextFunction } from "express";
import { tokenUtils } from "../utils/auth";

// Middleware to verify JWT access token and attach user to request
// This protects routes that require authentication
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Extract token from Authorization header
    // Expected format: "Bearer <token>"
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({
        success: false,
        message: "No authorization header provided",
      });
      return;
    }

    // Check if header starts with "Bearer "
    if (!authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Invalid authorization format. Use: Bearer <token>",
      });
      return;
    }

    // Extract the token (everything after "Bearer ")
    const token = authHeader.substring(7);

    if (!token) {
      res.status(401).json({
        success: false,
        message: "No token provided",
      });
      return;
    }

    // Verify the token and decode payload
    const decoded = tokenUtils.verifyAccessToken(token);

    // Attach the decoded user info to the request object
    // Now subsequent middleware and route handlers can access req.user
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error instanceof Error) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Authentication failed",
      });
    }
  }
};
