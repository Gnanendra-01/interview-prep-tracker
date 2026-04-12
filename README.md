# Interview Preparation Tracker

A complete full-stack web application built with React, Bootstrap, Express, and MongoDB. It helps users track interview preparation across subjects like DSA, DBMS, OS, and CN.

## Project structure

- `backend/` - Express server, Mongoose models, JWT auth, topic APIs
- `frontend/` - Vite React app with protected routes, analytics dashboard, topic management

## Backend setup

1. Open terminal in `InterviewPreparationTracker/backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` from `.env.example`
   ```bash
   copy .env.example .env
   ```
4. Start the backend:
   ```bash
   npm run dev
   ```

Default backend URL: `http://localhost:5000`

> Topics are stored globally in MongoDB and shared across all users. As a developer, you can insert topic documents into the `topics` collection once, and every registered user will see them.

## Frontend setup

1. Open terminal in `InterviewPreparationTracker/frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

The React app will run on `http://localhost:5173` by default.

## API Endpoints

- `POST /auth/register` - register user
- `POST /auth/login` - login user
- `GET /topics` - get all global topics with your personal status
- `POST /topics` - add a global topic (developer/admin use)
- `PUT /topics/:id` - update your status for a topic

## Sample data payloads

Register user:
```json
{
  "name": "Aman",
  "email": "aman@example.com",
  "password": "password123"
}
```

Add topic:
```json
{
  "subject": "DSA",
  "title": "Binary Search Trees",
  "status": "in-progress",
  "notes": "Practice tree traversal problems.",
  "resources": "https://leetcode.com/problems/binary-tree-inorder-traversal/"
}
```

## Viva explanation

- **Frontend**: Built with React and Bootstrap. Uses `react-router-dom` for routes, `axios` for API calls, and localStorage for JWT storage.
- **Backend**: Uses Express and Mongoose. JWT middleware protects topic routes and ensures each user only sees their own data.
- **Auth flow**: User registers or logs in, receives JWT, stores it in `localStorage`, and the app sends it in `Authorization` headers.
- **Analytics**: The dashboard computes completion percentage per subject and overall progress dynamically from the user topics.
- **UI**: Cards display subject progress, tables manage topic lists, and forms allow adding and filtering topics.

## Notes

- Use `.env` to configure `MONGO_URI`, `JWT_SECRET`, and `PORT`.
- Ensure MongoDB is running locally or provide a valid connection string.
- To preload topics manually, insert documents into the `topics` collection in MongoDB. Example:

```json
{
  "subject": "DSA",
  "title": "Binary Search Trees",
  "notes": "Practice tree traversal problems.",
  "resources": "https://leetcode.com/problems/binary-tree-inorder-traversal/"
}
```

- When users log in, the app fetches these topics and stores only status updates per user.
