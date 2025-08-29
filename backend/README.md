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

## GET /maps/get-coordinates

Returns coordinates for a given address.

### URL

`GET /maps/get-coordinates`

### Headers

- `Authorization`: `Bearer <token>` or cookie named `token` (httpOnly)

### Query Parameters

- `address` (string, required, min 3)

### Responses

#### 200 OK

```json
HTTP/1.1 200 OK
Content-Type: application/json

{ "ltd": 28.6139, "lng": 77.2090 }
```

#### 400 Bad Request

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{ "errors": [ { "msg": "string", "param": "string", "location": "query" } ] }
```

#### 401 Unauthorized

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{ "message": "No token provided" }
```

#### 404 Not Found

```json
HTTP/1.1 404 Not Found
Content-Type: application/json

{ "message": "Coordinates not found" }
```

## GET /maps/get-distance-time

Returns estimated distance and travel time between two addresses.

### URL

`GET /maps/get-distance-time`

### Headers

- `Authorization`: `Bearer <token>` or cookie named `token` (httpOnly)

### Query Parameters

- `origin` (string, required, min 3)
- `destination` (string, required, min 3)

### Responses

#### 200 OK

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "distance": { "text": "12.3 km", "value": 12345 },
  "duration": { "text": "24 mins", "value": 1450 },
  "status": "OK"
}
```

#### 400 Bad Request

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{ "errors": [ { "msg": "string", "param": "string", "location": "query" } ] }
```

#### 401 Unauthorized

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{ "message": "No token provided" }
```

#### 500 Internal Server Error

```json
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{ "message": "Internal server error" }
```

## GET /maps/get-suggestions

Returns place autocomplete suggestions for a partial input.

### URL

`GET /maps/get-suggestions`

### Headers

- `Authorization`: `Bearer <token>` or cookie named `token` (httpOnly)

### Query Parameters

- `input` (string, required, min 3)

### Responses

#### 200 OK

```json
HTTP/1.1 200 OK
Content-Type: application/json

[ "Connaught Place, New Delhi, Delhi", "Connaught Circus, New Delhi" ]
```

#### 400 Bad Request

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{ "errors": [ { "msg": "string", "param": "string", "location": "query" } ] }
```

#### 401 Unauthorized

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{ "message": "No token provided" }
```

#### 500 Internal Server Error

```json
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{ "message": "Internal server error" }
```

## POST /rides/create

Creates a new ride request for the authenticated user.

### URL

`POST /rides/create`

### Headers

- `Authorization`: `Bearer <token>` or cookie named `token` (httpOnly)

### Request Body

```json
{
  "pickup": "string",         // required
  "destination": "string",    // required
  "vehicleType": "auto|car|moto" // required
}
```

### Responses

#### 201 Created

```json
HTTP/1.1 201 Created
Content-Type: application/json

{
  "_id": "string",
  "user": "string",          // user id
  "pickup": "string",
  "destination": "string",
  "fare": 120,
  "status": "pending"
}
```

#### 400 Bad Request

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{ "errors": [ { "msg": "string", "param": "string", "location": "body" } ] }
```

#### 401 Unauthorized

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{ "message": "No token provided" }
```

#### 500 Internal Server Error

```json
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{ "message": "string" }
```

## GET /rides/get-fare

Estimates fares for all vehicle types between two addresses.

### URL

`GET /rides/get-fare`

### Headers

- `Authorization`: `Bearer <token>` or cookie named `token` (httpOnly)

### Query Parameters

- `pickup` (string, required, min 3)
- `destination` (string, required, min 3)

### Responses

#### 200 OK

```json
HTTP/1.1 200 OK
Content-Type: application/json

{ "auto": 100, "car": 150, "moto": 80 }
```

#### 400 Bad Request

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{ "errors": [ { "msg": "string", "param": "string", "location": "query" } ] }
```

#### 401 Unauthorized

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{ "message": "No token provided" }
```

#### 500 Internal Server Error

```json
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{ "message": "string" }
```

## POST /rides/confirm

Captain accepts a ride request.

### URL

`POST /rides/confirm`

### Headers

- `Authorization`: `Bearer <captain-token>` or cookie named `token` (httpOnly)

### Request Body

```json
{ "rideId": "string" } // MongoDB ObjectId
```

### Responses

#### 200 OK

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "_id": "string",
  "user": { "_id": "string", "fullname": { "firstname": "string", "lastname": "string" }, "email": "string" },
  "captain": { "_id": "string", "fullname": { "firstname": "string", "lastname": "string" }, "email": "string" },
  "pickup": "string",
  "destination": "string",
  "fare": 120,
  "status": "accepted",
  "otp": "123456"
}
```

#### 400 Bad Request

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{ "errors": [ { "msg": "string", "param": "string", "location": "body" } ] }
```

#### 401 Unauthorized

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{ "message": "No token provided" }
```

#### 500 Internal Server Error

```json
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{ "message": "string" }
```

## GET /rides/start-ride

Captain starts the ride after validating OTP.

### URL

`GET /rides/start-ride`

### Headers

- `Authorization`: `Bearer <captain-token>` or cookie named `token` (httpOnly)

### Query Parameters

- `rideId` (string, required, MongoDB ObjectId)
- `otp` (string, required, length 6)

### Responses

#### 200 OK

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "_id": "string",
  "status": "ongoing",
  "user": { "_id": "string" },
  "captain": { "_id": "string" }
}
```

#### 400 Bad Request

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{ "errors": [ { "msg": "string", "param": "string", "location": "query" } ] }
```

#### 401 Unauthorized

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{ "message": "No token provided" }
```

#### 500 Internal Server Error

```json
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{ "message": "string" }
```

## POST /rides/end-ride

Captain ends an ongoing ride.

### URL

`POST /rides/end-ride`

### Headers

- `Authorization`: `Bearer <captain-token>` or cookie named `token` (httpOnly)

### Request Body

```json
{ "rideId": "string" } // MongoDB ObjectId
```

### Responses

#### 200 OK

```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "_id": "string",
  "status": "completed",
  "user": { "_id": "string" },
  "captain": { "_id": "string" }
}
```

#### 400 Bad Request

```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{ "errors": [ { "msg": "string", "param": "string", "location": "body" } ] }
```

#### 401 Unauthorized

```json
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{ "message": "No token provided" }
```

#### 500 Internal Server Error

```json
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{ "message": "string" }
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
