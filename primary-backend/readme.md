# Production-Grade Authentication System

A complete, secure authentication system built with Express, TypeScript, Zod, and JWT.

## 🚀 Features

- ✅ **User Registration & Login** - Secure signup and login with email/password
- ✅ **JWT Authentication** - Access tokens (short-lived) and refresh tokens (long-lived)
- ✅ **Password Security** - Bcrypt hashing with salt rounds
- ✅ **Input Validation** - Zod schemas for type-safe validation
- ✅ **Rate Limiting** - Protection against brute force attacks
- ✅ **Security Headers** - Helmet.js for HTTP security
- ✅ **CORS Support** - Configurable cross-origin access
- ✅ **Error Handling** - Centralized error management
- ✅ **TypeScript** - Full type safety throughout
- ✅ **Refresh Token Rotation** - Secure token refresh mechanism
- ✅ **Multi-device Logout** - Logout from all devices

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- TypeScript knowledge

## 🔧 Installation

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env and set your secrets
nano .env
```

## 🏃 Running the Application

```bash
# Development mode (with auto-reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/auth
```

### 1. Register User
**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Validation Rules:**
- Name: 2-50 characters
- Email: Valid email format
- Password: Min 8 characters, must contain uppercase, lowercase, and number

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "xyz123",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-01-01T00:00:00.000Z"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### 2. Login
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "xyz123",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### 3. Refresh Access Token
**Endpoint:** `POST /api/auth/refresh`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### 4. Get User Profile (Protected)
**Endpoint:** `GET /api/auth/profile`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "xyz123",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

### 5. Logout (Single Device)
**Endpoint:** `POST /api/auth/logout`

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### 6. Logout All Devices (Protected)
**Endpoint:** `POST /api/auth/logout-all`

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out from 3 device(s)"
}
```

## 🔒 Security Features Explained

### 1. Password Hashing
- Uses bcrypt with 10 salt rounds
- Passwords are never stored in plain text
- One-way hashing prevents password recovery

### 2. JWT Tokens
- **Access Token**: Short-lived (15 minutes), used for API requests
- **Refresh Token**: Long-lived (7 days), used to get new access tokens
- Tokens are signed with secret keys from environment variables

### 3. Rate Limiting
- General API: 100 requests per 15 minutes per IP
- Auth endpoints: 5 attempts per 15 minutes per IP
- Prevents brute force attacks

### 4. Input Validation
- Zod schemas validate all inputs before processing
- Sanitizes data (trim, lowercase email)
- Type-safe validation with TypeScript inference

### 5. Security Headers
- Helmet.js adds security headers
- Protection against XSS, clickjacking, etc.
- Content Security Policy

### 6. Error Handling
- Never reveals sensitive information
- Generic error messages for authentication failures
- Detailed errors only in development mode

## 🏗️ Project Structure

```
src/
├── config/
│   └── index.ts              # Configuration management
├── controllers/
│   └── auth.controller.ts    # Route handlers
├── database/
│   └── index.ts              # In-memory database (replace with real DB)
├── middleware/
│   ├── auth.middleware.ts    # JWT verification
│   ├── validation.middleware.ts  # Zod validation
│   └── error.middleware.ts   # Error handling
├── routes/
│   └── auth.routes.ts        # Route definitions
├── types/
│   └── index.ts              # TypeScript types
├── utils/
│   └── auth.utils.ts         # Password & token utilities
├── validation/
│   └── auth.validation.ts    # Zod schemas
└── server.ts                 # App entry point
```

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Get Profile
```bash
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## ⚠️ Production Considerations

### Replace In-Memory Storage
The current implementation uses in-memory arrays. For production:

1. **Use a Real Database:**
   ```typescript
   // PostgreSQL with Prisma
   import { PrismaClient } from '@prisma/client';
   const prisma = new PrismaClient();
   
   // MongoDB with Mongoose
   import mongoose from 'mongoose';
   mongoose.connect(process.env.MONGODB_URI);
   ```

2. **Store Refresh Tokens in Redis:**
   ```typescript
   import Redis from 'ioredis';
   const redis = new Redis(process.env.REDIS_URL);
   ```

### Environment Variables
**Never commit secrets to version control!**

- Use strong, random secrets for JWT
- Generate secrets: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- Use different secrets for development and production

### Additional Security
- Enable HTTPS in production
- Add CSRF protection for web applications
- Implement account verification (email confirmation)
- Add password reset functionality
- Enable two-factor authentication (2FA)
- Add audit logging for security events
- Implement account lockout after failed attempts

### Performance
- Add database indexing on email field
- Use Redis for token blacklisting
- Implement token caching
- Add database connection pooling

### Monitoring
- Add logging (Winston, Pino)
- Implement health checks
- Monitor failed login attempts
- Track token refresh patterns
- Set up error tracking (Sentry)

## 📝 Code Explanation Summary

### Authentication Flow

**Signup:**
1. Validate input with Zod schema
2. Check if email already exists
3. Hash password with bcrypt
4. Create user in database
5. Generate access & refresh tokens
6. Store refresh token
7. Return tokens to client

**Login:**
1. Validate input
2. Find user by email
3. Verify password with bcrypt
4. Generate new tokens
5. Store refresh token
6. Return tokens

**Token Refresh:**
1. Validate refresh token
2. Verify token signature
3. Check token exists in database
4. Check expiration
5. Generate new access token
6. Return new access token

**Protected Routes:**
1. Extract token from Authorization header
2. Verify token signature
3. Decode payload
4. Attach user to request
5. Continue to route handler

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please follow security best practices.