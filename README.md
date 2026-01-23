#  SBA - Secure Web Portal

##  Overview
This project is a secure backend service built for Innovate Inc. as the final phase of their new user portal. The application serves as a single point of entry for all users, handling authentication, authorization, and private user data management.

The system allows users to:

* Register and log in using email and password
* Authenticate using a third-party provider (GitHub OAuth)
* Manage a private collection of personal resources (Bookmarks)

The project brings together all core backend concepts from this module, with a strong emphasis on security, clean architecture, and the DRY (Don’t Repeat Yourself) principle.

##  Workplace Context
Innovate Inc. requires a production-ready backend service that securely manages user identities and private data. This service must support multiple authentication strategies while ensuring that user-owned resources remain protected from unauthorized access.

As a developer on this project, your role is to design and implement a scalable Express API that follows industry best practices for authentication, authorization, and code organization.

##  Learning Objectives
By completing this project, you will demonstrate the ability to:

* Build a secure Express.js backend
* Implement local authentication using hashed passwords and JWTs
* Integrate third-party authentication using OAuth 2.0 (GitHub)
* Configure and use Passport.js strategies
* Design MongoDB schemas with ownership relationships
* Protect routes with authentication and authorization middleware
* Apply the DRY principle by reusing and adapting existing code

##  Description

This SBA focuses on building a secure web portal backend that includes:

* User registration and login with JWT-based authentication
* GitHub OAuth authentication using Passport.js
* Secure CRUD operations for user-owned resources (Bookmarks)
* Middleware-based access control to enforce data ownership

All protected routes ensure that:
* Only authenticated users can access them
* Users can only view, modify, or delete their own data


##  Resources

*  Express.js Documentation — https://expressjs.com/
*  Mongoose Documentation — https://mongoosejs.com/
*  Passport.js Documentation — https://www.passportjs.org/
*  GitHub OAuth Apps — https://docs.github.com/en/developers/apps/building-oauth-apps
*  JSON Web Tokens — https://jwt.io/


##  Getting Started
Follow the steps below to set up and run the project locally.

##  Requirements

*  Node.js v24+
*  npm
*  Git
*  A code editor (VS Code recommended)
*  MongoDB (local or cloud instance)

##  OS Compatibility

This lab works on:

*  Windows
*  macOS
*  Linux

##  Installation

1. Clone the repository:

git clone [<repository-url>](https://github.com/KaeTheDev/Secure-Web-Portal.git)

2. Navigate into the project folder:

cd secure-web-portal

##  Setup

1. Install dependencies:

npm install

2. Create a .env file in the root of the project and add the following variables:

MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/api/users/auth/github/callback

3. Ensure .env is listed in your .gitignore file.

4. Start the server:
noder server.js

##  Project Structure

config/ # Passport and database configuration
models/ # Mongoose schemas (User, Bookmark)
routes/ # API route handlers
utils/ # Auth utilities and middleware
server.js # Application entry point

## Key Models
* User
 - Supports both local and GitHub authentication
 - Fields include email, password (optional), and githubId (optional)

* Bookmark
 - Represents a private user-owned resource
 - Includes a reference to the owning user’s _id

## API Overview

## Authentication Routes
* POST /api/users/register — Register a new user
* POST /api/users/login — Log in and receive a JWT
* GET /api/users/auth/github — Start GitHub OAuth flow
* GET /api/users/auth/github/callback — GitHub OAuth callback and JWT issuance

## Bookmark Routes (Protected)
* POST /api/bookmarks — Create a bookmark
* GET /api/bookmarks — Get all user-owned bookmarks
* GET /api/bookmarks/:id — Get a single bookmark
* PUT /api/bookmarks/:id — Update a bookmark
* DELETE /api/bookmarks/:id — Delete a bookmark

All bookmark routes require authentication and enforce ownership-based authorization.