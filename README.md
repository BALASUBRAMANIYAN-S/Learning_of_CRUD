# User Management CRUD (React + Express + MongoDB)

A full-stack CRUD app to create, view, update and delete users. The frontend uses Redux Toolkit Query to talk to a REST API built with Express and MongoDB.

## Features

- List all users
- Add a new user (name and email; the `role` defaults to `user` on the server)
- Edit an existing user
- Delete a user
- Toast notifications for actions

## Tech Stack

| Part | Technology |
|---|---|
| Frontend (`FD/`) | React 19, Vite, Redux Toolkit (RTK Query), React Router 7, PrimeReact, Tailwind CSS 4, React-Toastify |
| Backend (`BD/`) | Node.js, Express 5, Mongoose, CORS |
| Database | MongoDB (`mongodb://localhost:27017/userDb`) |

## Project Structure

```
├── BD/                     # Backend
│   └── src/
│       ├── server.js
│       ├── routes/userRouter.js
│       ├── controller/userController.js
│       └── models/userModel.js
└── FD/                     # Frontend
    └── src/
        ├── pages/          # UserList, AddUser, UpdateUser
        ├── components/     # UserCard, UserForm
        ├── services/       # userApi.js (RTK Query)
        └── app/            # Redux store
```

## Getting Started

**Prerequisites:** Node.js 18+, npm, and MongoDB running locally.

### Backend

```bash
cd BD
npm install
```

`src/server.js` uses ES module `import` statements, so add `"type": "module"` to `BD/package.json` before running:

```bash
node src/server.js
```

The API runs on `http://localhost:5000`.

### Frontend

```bash
cd FD
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## API

Base URL: `http://localhost:5000/api/users`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | List all users |
| GET | `/:id` | Get one user |
| POST | `/` | Create a user |
| PUT | `/:id` | Update a user |
| DELETE | `/:id` | Delete a user |

**User model:** `name` (required), `email` (required, unique), `role` (`user` or `admin`, default `user`), `createdAt`.

## Notes

- Do not commit `node_modules`. Add it to `.gitignore`.
