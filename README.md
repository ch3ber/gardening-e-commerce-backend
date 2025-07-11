 # Gardening E-commerce Backend

 **Backend API for a gardening e-commerce platform built with Node.js, Express, TypeScript and Prisma.**

 ## Table of Contents
 - [Technologies](#technologies)
 - [Project Structure](#project-structure)
 - [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Environment Variables](#environment-variables)
 - [Database Setup](#database-setup)
 - [Running the Application](#running-the-application)
 - [Available Scripts](#available-scripts)
 - [Testing](#testing)
 - [Deployment](#deployment)

 ## Technologies

 - **Node.js** (runtime)
 - **TypeScript** (language)
 - **Express** (web framework)
 - **Prisma** (ORM)
 - **PostgreSQL** (database)
 - **Docker & Docker Compose** (containerization)
 - **Vitest** (testing framework)
 - **Supertest** (HTTP assertions for end-to-end tests)

 ## Project Structure

 ```
 .
 ├── prisma/                # Prisma schema & seed scripts
 ├── src/                   # Application source code
 │   ├── controllers/       # Route controllers
 │   ├── services/          # Business logic & database operations
 │   ├── routes/            # API route definitions
 │   ├── middlewares/       # Express middleware
 │   ├── dtos/              # Data transfer objects (validation schemas)
 │   ├── utils/             # Utility functions
 │   └── index.ts           # Application entry point
 ├── tests/                 # End-to-end tests & test utilities
 ├── docker-compose.yml     # Development services (PostgreSQL & pgAdmin)
 ├── .env.example           # Sample environment variables
 ├── tsconfig.json          # TypeScript config (dev)
 ├── tsconfig.production.json # TypeScript config (production)
 ├── vitest.config.ts       # Vitest configuration
 ├── package.json           # npm scripts & dependencies
 └── TODOS.md               # Pending tasks
 ```

 ## Getting Started

 ### Prerequisites

 - [Node.js](https://nodejs.org/) (>= 16.x)
 - [pnpm](https://pnpm.io/) (package manager)
 - [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

 ### Installation

 1. Clone the repository:
    ```bash
    git clone <repo-url>
    cd gardening-e-commerce-backend
    ```
 2. Install dependencies:
    ```bash
    pnpm install
    ```

 ### Environment Variables

 Copy the example and fill in your credentials:

 ```bash
 cp .env.example .env
 ```

 | Variable               | Description                                 |
 | ---------------------- | ------------------------------------------- |
 | `DATABASE_URL`         | PostgreSQL connection string                |
 | `POSTGRES_USER`        | Docker Compose Postgres user                |
 | `POSTGRES_PASSWORD`    | Docker Compose Postgres password            |
 | `POSTGRES_DB`          | Docker Compose Postgres database            |
 | `PGADMIN_DEFAULT_EMAIL`| pgAdmin login email                         |
 | `PGADMIN_DEFAULT_PASSWORD` | pgAdmin login password                 |
 | `PORT`                 | Server port (default: 3000)                 |
 | `SECRET_JWT_KEY`       | Secret key for signing JSON Web Tokens      |

 ## Database Setup

 1. Start PostgreSQL & pgAdmin via Docker Compose:
    ```bash
    docker-compose up -d
    ```
 2. Run Prisma migrations and generate client:
    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```
 3. (Optional) Seed the database with sample data:
    ```bash
    pnpm seed
    ```

 ## Running the Application

 - **Development mode** (with hot-reload):
   ```bash
   pnpm dev
   ```
 - **Production build**:
   ```bash
   pnpm build
   pnpm start
   ```

 ## Available Scripts

 ```bash
 pnpm dev         # Run in development mode
 pnpm build       # Compile TypeScript to JavaScript
 pnpm start       # Run the compiled app in production mode
 pnpm test        # Run end-to-end tests (Vitest + Supertest)
 pnpm seed        # Seed database with sample data
 ```

 ## Testing

 This project uses [Vitest](https://vitest.dev/) and [Supertest](https://github.com/visionmedia/supertest) for end-to-end API testing.

 ```bash
 pnpm test
 ```

 Tests are organized under `tests/e2e/` alongside mocks and utilities in `tests/mocks/` and `tests/utils/`.

 ## Deployment

 For production deployment:

 1. Build the app:
    ```bash
    pnpm build
    ```
 2. Ensure environment variables are set in your production environment.
 3. Run the compiled code:
    ```bash
    pnpm start
    ```

 (Optional) Use a process manager like PM2 or Docker to run the application in production.

 ---
