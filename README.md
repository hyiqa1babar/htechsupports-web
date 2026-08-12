# H-Tech Supports Web

Web application for H-Tech Supports built with React, Vite, TailwindCSS, and Vercel Serverless Functions.

## Architecture & Project Structure

- `client/`: React SPA built with Vite.
  - `client/src/`: React frontend application source code.
  - `client/api/`: Vercel serverless API endpoints (`posts.js`, `contact.js`, `health.js`).
  - `client/vercel.json`: Vercel routing and build configuration for client & serverless functions.
- `server/`: *(Deprecated)* Legacy Express backend server. See [SERVER_DEPRECATED.md](SERVER_DEPRECATED.md) for details on deprecation and removal instructions.

## Deployment Notes

This repository is configured for deployment on **Vercel** as a serverless application.

### Recommended Vercel Project Settings

- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### API Endpoints

- `GET /api/health` - Serverless health check
- `GET /api/posts` - Fetch blog/service posts
- `POST /api/contact` - Submit contact form (uses `nodemailer` when SMTP environment variables are configured)

### Environment Variables

For contact form functionality, set the following environment variables in Vercel project settings:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_RECEIVER_EMAIL`

## Local Development

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
