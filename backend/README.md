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
