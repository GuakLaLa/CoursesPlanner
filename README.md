# CoursesPlanner API

A simple course planning backend built with Express and MongoDB. This repository provides models and endpoints to manage users, courses, modules, assignments, and syllabus versions.

## Features

- User authentication (students & instructors)
- Course CRUD operations
- Module planning per course (weekly topics)
- Assignments with due dates and points
- Syllabus versioning

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (Atlas or local)

## Install

Open a PowerShell terminal in the project root and run:

npm install

## Environment variables

Create a `.env` file in the project root (or set environment variables in your hosting environment). Typical variables:

- `MONGODB_URI` — MongoDB connection string (Atlas or local)
- `JWT_SECRET` — secret for signing JWTs
- `PORT` — optional (default is 3000 or configured in `src/app.js`)

Example `.env` (DO NOT commit this file):

```
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/coursesplanner
JWT_SECRET=your_jwt_secret
PORT=3000
```

Note: The seed script currently contains a MongoDB URI inside the file. For production, it's best to replace that with `process.env.MONGODB_URI` and keep secrets in `.env`.

## Run the server

Start the server with:

```powershell
npm start
```

For development with automatic reload (if you have `nodemon` installed):

```powershell
npx nodemon src/app.js
```

## Seeding the database

A seed script is provided at `src/seed/seedData.js` which creates sample users, courses, modules, assignments, and syllabus versions. Run it with:

```powershell
node "src/seed/seedData.js"
```

This script will delete and re-insert the collections it touches (Users, Courses, Modules, Assignments, SyllabusVersions). Use carefully on non-test databases.

(Optional) Add an npm script in `package.json` for convenience:

```json
"scripts": {
  "seed": "node src/seed/seedData.js",
  "start": "node src/app.js"
}
```

Then run:

```powershell
npm run seed
```

## API overview

The backend exposes REST endpoints. The main route files are in `src/routes` and include:

- `authRoute.js` — login / register
- `courseRoutes.js` — create/list/get/update/delete courses
- `moduleRoutes.js` — manage course modules (week/topic/reading)
- `assignmentRoutes.js` — manage assignments
- `syllabusRoutes.js` — manage syllabus versions

Example endpoints (adjust base URL and paths if your `app.js` mounts them differently):

- POST `/api/auth/register` — register a user
- POST `/api/auth/login` — login and receive a JWT
- GET `/api/courses` — list courses
- POST `/api/courses` — create a course (INSTRUCTOR role)
- GET `/api/courses/:id/modules` — list modules for a course
- POST `/api/assignments` — create an assignment
- GET `/api/syllabi/:courseId` — get syllabus versions for a course

Read the controller code in `src/controllers` for exact request/response shapes and required fields.

## Project structure

```
src/
  app.js                // Express app entry
  controllers/          // Request handlers
  middleware/           // auth & role checks
  models/               // Mongoose schemas
  routes/               // Express routes
  seed/                 // seedData.js
  utils/                // DB helpers
```

## Testing

There is a placeholder test in `src/tests`. Run tests with:

```powershell
npm test
```
