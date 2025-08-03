---
description: Repository Information Overview
alwaysApply: true
---

# Bal Krishna Nivas Information

## Summary
A comprehensive MERN stack application for family management, featuring family tree visualization, news updates, event management, and user authentication. The system allows families to manage their family tree, share news, organize events, and maintain user profiles.

## Structure
- **server/**: Backend Node.js application with Express
  - **models/**: MongoDB schemas (User, FamilyMember, News, Event)
  - **routes/**: API endpoints for auth, users, family, news, events
  - **middleware/**: Authentication middleware
- **client/**: React frontend application
  - **src/**: Source code with components, pages, context, utils
  - **public/**: Static assets and HTML template
  - **build/**: Production build output

## Language & Runtime
**Language**: JavaScript (Node.js backend, React frontend)
**Version**: Node.js v14+ (recommended)
**Build System**: npm scripts
**Package Manager**: npm

## Dependencies

### Backend Dependencies
**Main Dependencies**:
- express: ^4.18.2 (Web framework)
- mongoose: ^7.6.0 (MongoDB ODM)
- bcryptjs: ^2.4.3 (Password hashing)
- jsonwebtoken: ^9.0.2 (Authentication)
- cors: ^2.8.5 (Cross-origin resource sharing)
- dotenv: ^16.3.1 (Environment variables)
- multer: ^1.4.5-lts.1 (File uploads)
- cloudinary: ^1.41.0 (Image storage)

**Development Dependencies**:
- nodemon: ^3.0.1 (Auto-restart server)
- concurrently: ^8.2.2 (Run multiple commands)

### Frontend Dependencies
**Main Dependencies**:
- react: ^19.1.0 (UI library)
- react-dom: ^19.1.0 (DOM rendering)
- react-router-dom: ^7.7.0 (Routing)
- axios: ^1.10.0 (HTTP client)
- tailwindcss: ^3.4.17 (CSS framework)
- i18next: ^25.3.2 (Internationalization)

## Build & Installation
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client && npm install

# Run both frontend and backend in development
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client

# Build for production
npm run build
```

## Testing
**Framework**: Jest with React Testing Library
**Test Location**: client/src/App.test.js and other test files
**Configuration**: client/src/setupTests.js
**Run Command**:
```bash
cd client && npm test
```

## Database
**Type**: MongoDB
**Connection**: Uses mongoose to connect to MongoDB
**Models**:
- User: Authentication and profile information
- FamilyMember: Family tree structure and relationships
- News: Family announcements and updates
- Event: Event planning and management

## Environment Configuration
**Configuration File**: .env in root directory
**Required Variables**:
- NODE_ENV: development/production
- MONGO_URI: MongoDB connection string
- JWT_SECRET: Secret for JWT token generation
- PORT: Server port (default: 5000)
- CLOUDINARY_* variables for image uploads