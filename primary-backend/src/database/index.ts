import { User, RefreshToken } from "../types";

// In-memory storage (for production, use a real database like PostgreSQL, MongoDB, etc.)
// This simulates a database for demonstration purposes

// Store users - in production, this would be a database table
const users: User[] = [];

// Store refresh tokens - in production, store these in Redis or a database
const refreshTokens: RefreshToken[] = [];

// Database operations for Users
export const userDb = {
  // Find a user by email
  findByEmail: (email: string): User | undefined => {
    return users.find((user) => user.email === email);
  },

  // Find a user by ID
  findById: (id: string): User | undefined => {
    return users.find((user) => user.id === id);
  },

  // Create a new user
  create: (userData: Omit<User, "id" | "createdAt" | "updatedAt">): User => {
    const newUser: User = {
      id: generateId(), // Generate unique ID
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    users.push(newUser);
    return newUser;
  },

  // Get all users (for debugging - remove in production)
  findAll: (): User[] => {
    return users;
  },
};

// Database operations for Refresh Tokens
export const refreshTokenDb = {
  // Store a new refresh token
  create: (tokenData: Omit<RefreshToken, "createdAt">): RefreshToken => {
    const newToken: RefreshToken = {
      ...tokenData,
      createdAt: new Date(),
    };

    refreshTokens.push(newToken);
    return newToken;
  },

  // Find a refresh token by the token string
  findByToken: (token: string): RefreshToken | undefined => {
    return refreshTokens.find((rt) => rt.token === token);
  },

  // Delete a specific refresh token (for logout)
  deleteByToken: (token: string): boolean => {
    const index = refreshTokens.findIndex((rt) => rt.token === token);

    if (index !== -1) {
      refreshTokens.splice(index, 1);
      return true;
    }

    return false;
  },

  // Delete all refresh tokens for a user (logout from all devices)
  deleteByUserId: (userId: string): number => {
    const initialLength = refreshTokens.length;

    // Filter out all tokens for this user
    const filtered = refreshTokens.filter((rt) => rt.userId !== userId);
    refreshTokens.length = 0;
    refreshTokens.push(...filtered);

    return initialLength - refreshTokens.length;
  },

  // Clean up expired tokens (should run periodically)
  deleteExpired: (): number => {
    const now = new Date();
    const initialLength = refreshTokens.length;

    const filtered = refreshTokens.filter((rt) => rt.expiresAt > now);
    refreshTokens.length = 0;
    refreshTokens.push(...filtered);

    return initialLength - refreshTokens.length;
  },
};

// Simple ID generator (in production, use UUID or database auto-increment)
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
