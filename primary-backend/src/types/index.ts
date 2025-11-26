// Core user interface that represents a user in our system
export interface User {
  id: string; // Unique identifier for the user
  name: string; // User's full name
  email: string; // User's email (unique)
  password: string; // Hashed password (never store plain text!)
  createdAt: Date; // Timestamp of account creation
  updatedAt: Date; // Timestamp of last update
}

// Interface for refresh tokens stored in our "database"
export interface RefreshToken {
  token: string; // The actual refresh token string
  userId: string; // Which user this token belongs to
  expiresAt: Date; // When this token expires
  createdAt: Date; // When this token was created
}

// JWT payload structure - data encoded in the token
export interface JWTPayload {
  userId: string; // User's unique ID
  email: string; // User's email
  iat?: number; // Issued at timestamp (added by JWT library)
  exp?: number; // Expiration timestamp (added by JWT library)
}

// Extended Express Request type to include authenticated user
// This allows TypeScript to know req.user exists after authentication
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload; // Decoded JWT payload attached to request
    }
  }
}
