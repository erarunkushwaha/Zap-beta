import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

// Generic validation middleware factory
// Takes a Zod schema and returns Express middleware
export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate request body against the schema
      // If validation passes, parsed data is returned
      // If validation fails, a ZodError is thrown
      const validatedData = schema.parse(req.body);

      // Replace req.body with validated and sanitized data
      // This ensures type safety and removes any extra fields
      req.body = validatedData;

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof ZodError) {
        // Format Zod errors into a more readable format
        const errors = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));

        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors,
        });
        return;
      }

      // Handle unexpected errors
      res.status(500).json({
        success: false,
        message: "Internal server error during validation",
      });
    }
  };
};
