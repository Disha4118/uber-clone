# Uber Clone

A full-stack ride-sharing application inspired by Uber, built with:

- Backend: Node.js, Express, MongoDB
- Frontend: React, Vite, Tailwind CSS

This repository contains two main folders:

- `backend/`: REST API server handling authentication, user and captain management.
- `frontend/`: React application for users and captains to sign up, log in, and access protected pages.

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/disha4118/uber-clone.git
   cd uber-clone
   ```

2. Install backend dependencies and run server:
   ```bash
   cd backend
   npm install
   cp .env.example .env   # configure MONGO_URI and JWT_SECRET
   npm run dev            # or npx nodemon server.js
   ```

3. Install frontend dependencies and run dev server:
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env   # set VITE_BASE_URL=http://localhost:3000
   npm run dev
   ```

Your application will be running:

- Backend API: http://localhost:3000
- Frontend: http://localhost:5173

---

## API Documentation

Refer to [`backend/README.md`](backend/README.md) for detailed API endpoint documentation.

## Project Structure

```
uber-clone/
├── backend/   # Express API server
├── frontend/  # React client
└── README.md  # Project overview and setup instructions
```

## License

MIT

# API Documentation

## POST /users/register

Registers a new user in the system.

### URL

`POST /users/register`

### Request Body

The request must be sent as JSON with the following fields:

```json
{
  "fullname": {
    "firstname": "string",   // required
    "lastname": "string"     // required
  },
  "email": "string",        // required, must be a valid email
  "password": "string"      // required, minimum 6 characters
}
```

- `fullname.firstname`: User's first name (required)
- `fullname.lastname`: User's last name (required)
- `email`: User's email address (required, valid format)
- `password`: User's password (required, at least 6 characters)

### Responses

#### 201 Created

User successfully registered. Returns the newly created user object and an authentication token.

```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "password": "string"  // hashed password
  },
  "token": "string"      // JWT authentication token
}
```

#### 400 Bad Request

Validation failed. One or more required fields missing or invalid.

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "body"
    }
    // ... additional errors
  ]
}
```

## POST /users/login

Logs in an existing user and returns an authentication token.

### URL

`POST /users/login`

### Request Body

```json
{
  "email": "string",     // required, must be a valid email
  "password": "string"   // required
}
```

- `email`: User's email address (required, valid format)
- `password`: User's password (required)

### Responses

#### 200 OK

Login successful. Returns the user object and a JWT token.

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "password": "string"  // hashed password
  },
  "token": "string"      // JWT authentication token
}
```

#### 400 Bad Request

Validation failed. Missing or invalid fields.

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "body"
    }
    // ... additional errors
  ]
}
```

#### 401 Unauthorized

Login failed due to invalid credentials (user not found or incorrect password).

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "string"
}
```

## GET /users/profile

Fetches the authenticated user's profile.

### URL

`GET /users/profile`

### Headers

- `Authorization`: `Bearer <token>` or cookie named `token` (httpOnly)

### Responses

#### 200 OK

Returns the user profile.

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "user": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string"
  }
}
```

#### 401 Unauthorized

Authentication required or invalid token.

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "string"
}
```

#### 404 Not Found

User not found.

```json
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "message": "User not found"
}
```

## POST /users/logout

Logs out the authenticated user by clearing the auth cookie and blacklisting the token.

### URL

`POST /users/logout`

### Headers

- `Authorization`: `Bearer <token>` or cookie named `token` (httpOnly)

### Responses

#### 200 OK

Logout successful.

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "message": "Logged out successfully"
}
```

#### 401 Unauthorized

No token provided or invalid authentication.

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "No token provided"
}
```

## POST /captains/register

Registers a new captain in the system.

### URL

`POST /captains/register`

### Request Body

```json
{
  "fullname": {
    "firstname": "string",  // required
    "lastname": "string"    // required
  },
  "email": "string",       // required, valid email format
  "password": "string",    // required, minimum 6 characters
  "vehicle": {
    "color": "string",        // required
    "plate": "string",        // required
    "capacity": number,         // required
    "vehicleType": "string"   // required, one of ["car", "bike", "auto"]
  }
}
```

### Responses

#### 201 Created

Captain successfully registered. Returns the newly created captain object and an authentication token.

```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "active",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": number,
      "vehicleType": "string"
    }
  },
  "token": "string"  // JWT authentication token
}
```

#### 400 Bad Request

Validation failed. Missing or invalid fields.

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errors": [
    {
      "msg": "string",
      "param": "string",
      "location": "body"
    }
    // ... additional errors
  ]
}
```

## POST /captains/login

Logs in an existing captain and returns an authentication token.

### URL

`POST /captains/login`

### Request Body

```json
{
  "email": "string",     // required, valid email
  "password": "string"   // required
}
```

- `email`: Captain's email address (required, valid format)
- `password`: Captain's password (required)

### Responses

#### 200 OK

Login successful. Returns the captain object and a JWT token.

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "active",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": number,
      "vehicleType": "string"
    }
  },
  "token": "string"      // JWT authentication token
}
```

#### 400 Bad Request

Validation failed. Missing or invalid fields.

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errors": [
    { "msg": "string", "param": "string", "location": "body" }
    // ... additional errors
  ]
}
```

#### 401 Unauthorized

Login failed due to invalid credentials.

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
  "message": "Invalid email or password"
}
```

## GET /captains/profile

Fetches the authenticated captain's profile.

### URL

`GET /captains/profile`

### Headers

- `Authorization`: `Bearer <token>` or cookie named `token` (httpOnly)

### Responses

#### 200 OK

Returns the captain profile.

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "captain": {
    "_id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "status": "active",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": number,
      "vehicleType": "string"
    }
  }
}
```

#### 401 Unauthorized

Authentication required or invalid token.

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{ "message": "No token provided" }
```

#### 404 Not Found

Captain not found.

```json
HTTP/1.1 404 Not Found
Content-Type: application/json

{ "message": "Captain not found" }
```

## POST /captains/logout

Logs out the authenticated captain by clearing the auth cookie and blacklisting the token.

### URL

`POST /captains/logout`

### Headers

- `Authorization`: `Bearer <token>` or cookie named `token` (httpOnly)

### Responses

#### 200 OK

Logout successful.

```json
HTTP/1.1 200 OK
Content-Type: application/json

{ "message": "Logged out successfully" }
```

#### 401 Unauthorized

No token provided or invalid authentication.

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{ "message": "No token provided" }
```
