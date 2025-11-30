// lib/utils/error-handler.ts
import { NextResponse } from "next/server";

// Custom Error Class
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public errorCode?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(message, 404, "NOT_FOUND");
  }
}

export class ValidationError extends AppError {
  constructor(message: string = "Validation failed") {
    super(message, 400, "VALIDATION_ERROR");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  details?: any;
}

export function handleError(error: any): NextResponse<ErrorResponse> {
  console.error("🔴 Error Handler:", {
    name: error.name,
    message: error.message,
    code: error.code,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });

  // MongoDB Duplicate Key Error (Unique constraint)
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    const value = error.keyValue[field];

    return NextResponse.json(
      {
        success: false,
        error: "DUPLICATE_ENTRY",
        message: `${field} '${value}' already exists`,
        details: { field, value },
      },
      { status: 409 }
    );
  }

  // Mongoose Validation Error
  if (error.name === "ValidationError") {
    const errors: Record<string, string> = {};
    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });

    return NextResponse.json(
      {
        success: false,
        error: "VALIDATION_ERROR",
        message: "Validation failed",
        details: errors,
      },
      { status: 400 }
    );
  }

  // Mongoose Cast Error (Invalid ObjectId)
  if (error.name === "CastError") {
    return NextResponse.json(
      {
        success: false,
        error: "INVALID_ID",
        message: "Invalid ID format",
        details: { path: error.path, value: error.value },
      },
      { status: 400 }
    );
  }

  // Zod Validation Error
  if (error.name === "ZodError") {
    const details = error.errors.map((err: any) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return NextResponse.json(
      {
        success: false,
        error: "VALIDATION_ERROR",
        message: "Validation failed",
        details,
      },
      { status: 400 }
    );
  }

  // Custom App Error (if you have custom error classes)
  if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
    return NextResponse.json(
      {
        success: false,
        error: error.name || "CLIENT_ERROR",
        message: error.message,
      },
      { status: error.statusCode }
    );
  }

  // JWT Errors
  if (error.name === "JsonWebTokenError") {
    return NextResponse.json(
      {
        success: false,
        error: "INVALID_TOKEN",
        message: "Invalid token",
      },
      { status: 401 }
    );
  }

  if (error.name === "TokenExpiredError") {
    return NextResponse.json(
      {
        success: false,
        error: "TOKEN_EXPIRED",
        message: "Token expired",
      },
      { status: 401 }
    );
  }

  // Default Internal Server Error
  return NextResponse.json(
    {
      success: false,
      error: "INTERNAL_SERVER_ERROR",
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    },
    { status: 500 }
  );
}
