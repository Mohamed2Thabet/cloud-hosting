# Cloud Hosting Platform

A modern, scalable web application built with Next.js and TypeScript, designed to manage cloud hosting resources, user profiles, and content delivery.

## Overview

This application serves as a robust platform for content management and cloud resource provisioning. It addresses the need for a secure, performant, and type-safe environment where users can manage their profiles, publish articles, and interact through comments. It is designed for developers and administrators looking for a production-ready foundation with built-in authentication and data validation.

## Features

- **Authentication**: Secure user registration and login using JWT.
- **User Management**: Comprehensive profile management including updates and account deletion.
- **Content Management**: Article creation, reading, updating, and deletion with pagination support.
- **Interactive System**: Commenting system for articles to foster user engagement.
- **Admin Dashboard**: Privileged access for managing users and content.
- **RESTful API**: Well-structured API routes handling all CRUD operations.
- **Data Validation**: Strict runtime validation using Zod for all incoming requests.
- **Security**: Password hashing with Bcrypt and protected routes via middleware.

## Tech Stack

- **Frontend**: Next.js (App Router), React, React Icons
- **Backend**: Next.js API Routes (Serverless functions)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Language**: TypeScript
- **Validation**: Zod
- **Authentication**: JSON Web Tokens (JWT), Bcrypt

## Project Structure

The project follows a modular architecture to ensure separation of concerns:

- `src/app/`: Contains the App Router pages, layouts, and API route handlers.
- `src/components/`: Reusable UI components.
- `src/utils/`: Utility functions, database connection helpers, and DTO definitions.
- `prisma/`: Database schema and migration files.
- `public/`: Static assets.

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm
- PostgreSQL database instance

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your_secure_jwt_secret"
NODE_ENV="development"
```

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cloud-hosting-platform.git
   cd cloud-hosting-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Initialize the database:
   ```bash
   npx prisma migrate dev
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

The application will be available at `https://cloud-hosting-inky.vercel.app/`.

## Scripts

- `npm run dev`: Starts the development server with hot-reloading.
- `npm run build`: Builds the application for production.
- `npm start`: Runs the built production application.
- `npm run lint`: Runs ESLint to check for code quality issues.

## API Overview

The application exposes a RESTful API under `/api`. Key endpoints include:

### Authentication
- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Authenticate a user.

### Users
- `GET /api/users/profile/:id`: Retrieve user profile.
- `PUT /api/users/profile/:id`: Update user details.
- `DELETE /api/users/profile/:id`: Delete user account.

### Articles
- `GET /api/articles`: Fetch paginated articles.
- `POST /api/articles`: Create a new article.
- `GET /api/articles/:id`: Get a specific article.

### Comments
- `POST /api/comments`: Add a comment to an article.
- `DELETE /api/comments/:id`: Remove a comment.

## Security Considerations

- **Password Hashing**: All user passwords are hashed using Bcrypt before storage.
- **JWT Authentication**: Stateless authentication using JSON Web Tokens.
- **Input Validation**: Zod schemas ensure that all API inputs meet expected formats, preventing injection attacks and data corruption.
- **Type Safety**: TypeScript is used throughout the stack to catch errors at compile time.

## Future Improvements

- **Role-Based Access Control (RBAC)**: Granular permissions for different user roles.
- **Rate Limiting**: Implementation of rate limiting to prevent abuse of API endpoints.
- **Caching**: Redis integration for caching frequently accessed data.
- **Email Verification**: Integration with email providers for account verification.
- **File Uploads**: Support for user avatars and article cover images.
- **Testing**: Comprehensive unit and end-to-end testing.
- **CI/CD**: Automated deployment pipelines.
- **Docker Support**: Containerization for consistent deployment environments.

## License

This project is licensed under the MIT License.
