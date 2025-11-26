import { Request, Response, NextFunction } from "express";
import { userDb, refreshTokenDb } from "../database";
import { passwordUtils, tokenUtils } from "../utils/auth";
import { AppError } from "../middleware/errorMiddleware";
import {
  SignupInput,
  LoginInput,
  RefreshTokenInput,
} from "../validation/authValidation";

// Controller for user signup
export const signup = async (
  req: Request<{}, {}, SignupInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = userDb.findByEmail(email);
    if (existingUser) {
      throw new AppError("User with this email already exists", 409);
    }

    // Hash the password before storing
    // NEVER store plain text passwords!
    const hashedPassword = await passwordUtils.hash(password);

    // Create new user in database
    const newUser = userDb.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT tokens
    const tokenPayload = {
      userId: newUser.id,
      email: newUser.email,
    };

    const accessToken = tokenUtils.generateAccessToken(tokenPayload);
    const refreshToken = tokenUtils.generateRefreshToken(tokenPayload);

    // Store refresh token in database
    refreshTokenDb.create({
      token: refreshToken,
      userId: newUser.id,
      expiresAt: tokenUtils.getRefreshTokenExpiry(),
    });

    // Send response (exclude password from response)
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error); // Pass error to error handler middleware
  }
};

// Controller for user login
export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = userDb.findByEmail(email);
    if (!user) {
      // Don't reveal whether email exists (security best practice)
      throw new AppError("Invalid email or password", 401);
    }

    // Verify password
    const isPasswordValid = await passwordUtils.compare(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    // Generate JWT tokens
    const tokenPayload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken = tokenUtils.generateAccessToken(tokenPayload);
    const refreshToken = tokenUtils.generateRefreshToken(tokenPayload);

    // Store refresh token in database
    refreshTokenDb.create({
      token: refreshToken,
      userId: user.id,
      expiresAt: tokenUtils.getRefreshTokenExpiry(),
    });

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Controller to refresh access token
export const refreshAccessToken = async (
  req: Request<{}, {}, RefreshTokenInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    // Verify refresh token
    const decoded = tokenUtils.verifyRefreshToken(refreshToken);

    // Check if refresh token exists in database
    const storedToken = refreshTokenDb.findByToken(refreshToken);
    if (!storedToken) {
      throw new AppError("Invalid refresh token", 401);
    }

    // Check if token is expired
    if (storedToken.expiresAt < new Date()) {
      // Delete expired token
      refreshTokenDb.deleteByToken(refreshToken);
      throw new AppError("Refresh token has expired", 401);
    }

    // Verify user still exists
    const user = userDb.findById(decoded.userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Generate new access token
    const tokenPayload = {
      userId: user.id,
      email: user.email,
    };

    const newAccessToken = tokenUtils.generateAccessToken(tokenPayload);

    // Send new access token
    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Controller for logout
export const logout = async (
  req: Request<{}, {}, RefreshTokenInput>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    // Delete refresh token from database
    const deleted = refreshTokenDb.deleteByToken(refreshToken);

    if (!deleted) {
      throw new AppError("Refresh token not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
};

// Controller for logout from all devices
export const logoutAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // req.user is set by authenticate middleware
    if (!req.user) {
      throw new AppError("User not authenticated", 401);
    }

    // Delete all refresh tokens for this user
    const deletedCount = refreshTokenDb.deleteByUserId(req.user.userId);

    res.status(200).json({
      success: true,
      message: `Logged out from ${deletedCount} device(s)`,
    });
  } catch (error) {
    next(error);
  }
};

// Controller to get current user profile
export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // req.user is set by authenticate middleware
    if (!req.user) {
      throw new AppError("User not authenticated", 401);
    }

    // Find user in database
    const user = userDb.findById(req.user.userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Send user data (exclude password)
    res.status(200).json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
