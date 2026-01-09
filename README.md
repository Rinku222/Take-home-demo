# User Management App

Built this React app for handling user authentication and basic user management. Uses Vite for fast development and includes login/signup functionality with protected routes.

## What's included

- Login and signup pages
- Protected routes that require authentication
- Responsive design that works on mobile
- Toast notifications for user feedback
- Form validation
- Jest tests for components

## Stack

- React 19.2.0
- Vite with Rolldown
- React Router DOM 7.12.0
- Axios for API calls
- React Toastify for notifications
- Jest + React Testing Library
- ESLint

## Getting started

You'll need Node.js 16+ and a backend API running on port 3000.

```bash
git clone <repo-url>
cd frontend
npm install
npm run dev
```

Then open http://localhost:5173

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run preview  # preview build locally
npm run lint     # run linter
npm test         # run tests
npm run test:watch  # tests in watch mode
```

## API endpoints

The app expects these endpoints on your backend (localhost:3000):

```
POST /api/auth/login
POST /api/auth/register  
GET /api/user/profile
```

## Folder structure

```
src/
├── api/           # axios config and endpoints
├── components/    # reusable UI components
│   ├── Atoms/     # buttons, inputs, etc
│   ├── Modal/     # modal components
│   └── Molecules/ # composed components
├── context/       # React context
├── hooks/         # custom hooks
├── pages/         # page components
├── routes/        # routing setup
├── utils/         # helper functions
└── test/          # test configuration
```

## Configuration

To change the API URL, edit `src/api/axios.jsx`:

```js
const api = axios.create({
  baseURL: 'http://your-api-url/api'
});
```

## Production build

```bash
npm run build
npm run preview  # test the build
```

Files go to `dist/` folder.

## Common issues

**Port 5173 in use?** Vite will pick the next available port automatically.

**Can't connect to API?** Make sure your backend is running on port 3000 and check for CORS issues in the browser console.

**Dependency problems?** Delete `node_modules` and `package-lock.json`, then run `npm install` again.

## Development notes

- Authentication state is managed with React Context
- Protected routes redirect to login if not authenticated
- Toast notifications show API errors automatically
- All forms have basic validation
- Tests are set up for components in the Atoms folder
