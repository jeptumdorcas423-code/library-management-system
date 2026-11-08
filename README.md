# Library Management System

## Project Description

The Library Management System is a backend application developed using NestJS, PostgreSQL and Prisma ORM. It manages library users, books and book genres.

## Technologies Used

- NestJS – Backend framework.
- PostgreSQL – Relational database.
- Prisma ORM – Database management and queries.
- TypeScript – Programming language.

## Database Models

The system contains three main models:

1. **User:** Stores user details, including name, email, password and role.
2. **Genre:** Stores book categories.
3. **Book:** Stores book details, including title, author, ISBN and available copies.

## Schema Decisions

The Book model references the Genre model using a foreign key called `genreId` rather than embedding genre information directly inside each book.

This relational design avoids data duplication, maintains data consistency and makes it easier to organize and retrieve books by genre.

The Role enum defines two user roles: PATRON and LIBRARIAN.

## Database Seeding

The database is seeded with:

- 4 genres: Fiction, Technology, Science and History.
- 15 sample books distributed across the four genres.

## Running the Project

1. Navigate to the api directory.
2. Install dependencies using `npm install`.
3. Configure the DATABASE_URL in the `.env` file.
4. Run database migrations using `npx prisma migrate dev`.
5. Seed the database using `npx prisma db seed`.
6. Start the application using `npm run start:dev`.

## Environment Variables

The project includes an `.env.example` file showing the required database connection variable.

A real `.env` file containing database credentials should remain private and must not be committed to GitHub.