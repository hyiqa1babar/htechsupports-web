# Legacy Express Server Deprecation & Cleanup Guide

## Overview

The standalone Express server inside the `server/` directory has been converted into Vercel serverless function endpoints located under `client/api/`:

- `client/api/health.js` (replaces `GET /api/health`)
- `client/api/posts.js` (replaces `GET /api/posts`)
- `client/api/contact.js` (replaces `POST /api/contact` / `POST /api/contact/submit`)

`nodemailer` has been added to `client/package.json` so Vercel installs all necessary dependencies for serverless mail delivery.

---

## Safe Instructions for Cleanup

Do NOT delete the `server/` directory or root `vercel.json` until CI and Vercel preview deployments are fully verified.

### Cleanup Checklist & Steps

1. **Verify CI & Previews**:
   - Ensure the GitHub Actions CI build check passes on your PR to `dev`.
   - Verify that the Vercel preview deployment builds cleanly and that all endpoints (`/`, `/api/health`, `/api/posts`, `POST /api/contact`) respond as expected.

2. **Vercel Project Settings Verification**:
   - In the Vercel Dashboard project settings:
     - **Root Directory**: `client`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Execute Cleanup on a Cleanup Branch**:
   ```bash
   git checkout -b cleanup/remove-legacy-server
   git rm -r server
   git rm vercel.json # Remove root vercel.json once Vercel Root Directory is set to client
   git commit -m "chore(cleanup): remove legacy Express server and root vercel.json"
   git push -u origin cleanup/remove-legacy-server
   ```

4. **Submit PR**:
   - Open a PR from `cleanup/remove-legacy-server` into `dev`.
   - Verify Vercel preview deployment after removal before merging into `dev`.
