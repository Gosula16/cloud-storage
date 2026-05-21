# CloudDrive Cloud Storage

CloudDrive is a full-stack cloud file storage app with authentication, AWS S3 file uploads, file listing, downloads, previews, share links, and storage stats.

## Live Links

- Frontend: https://cloud-storage-frontend1-master.vercel.app
- Backend: https://cloud-storage-backend-nv0d.onrender.com
- Backend health check: https://cloud-storage-backend-nv0d.onrender.com/health

## Tech Stack

- Frontend: React, Create React App, Axios, React Router, React Dropzone
- Backend: Node.js, Express, JWT auth, HTTP-only cookies, Multer
- Storage: AWS S3
- Frontend hosting: Vercel
- Backend hosting: Render

## Project Structure

```text
cloud-storage-frontend1-master/
  React frontend deployed on Vercel

cloud-storage-backend-main/cloud-storage-backend-main/cloud-file-storage-aws/
  Express backend deployed on Render

render.yaml
  Render Blueprint config for backend deployment
```

## Features

- User registration and login
- JWT authentication with cookie support
- Drag-and-drop file selection
- File upload to AWS S3
- File list with download, preview, share, and delete actions
- Storage statistics
- Vercel and Render production configuration
- Persistent backend user storage on Render disk

## Frontend Setup

```bash
cd cloud-storage-frontend1-master
npm install
cp .env.example .env.local
npm start
```

Frontend environment variable:

```env
REACT_APP_API_BASE_URL=https://cloud-storage-backend-nv0d.onrender.com
```

## Backend Setup

```bash
cd cloud-storage-backend-main/cloud-storage-backend-main/cloud-file-storage-aws
npm install
cp .env.example .env
npm run dev
```

Backend environment variables:

```env
NODE_ENV=production
CLIENT_ORIGIN=https://cloud-storage-frontend1-master.vercel.app
ALLOW_VERCEL_ORIGINS=true
JWT_SECRET=<long-random-secret>
JWT_EXPIRES_IN=7d
AWS_ACCESS_KEY_ID=<aws-access-key>
AWS_SECRET_ACCESS_KEY=<aws-secret-key>
AWS_REGION=<aws-region>
AWS_BUCKET_NAME=<s3-bucket-name>
MAX_FILE_SIZE_BYTES=26214400
SIGNED_URL_EXPIRES_SECONDS=3600
DATA_DIR=/var/lib/cloud-storage
```

## Deployment

### Frontend on Vercel

Set this Vercel environment variable:

```env
REACT_APP_API_BASE_URL=https://cloud-storage-backend-nv0d.onrender.com
```

Then deploy from `cloud-storage-frontend1-master`.

### Backend on Render

The root `render.yaml` deploys the backend as a Render Blueprint. Add the required secret environment variables in Render:

```env
JWT_SECRET
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
AWS_BUCKET_NAME
```

Render sets `PORT` automatically. Do not hardcode it in Render.

## Verification

Recently verified:

- Frontend production build passes.
- Backend syntax test passes.
- Render `/health` returns `200`.
- Register/login works.
- Upload to S3 works.
- Delete uploaded file works.

## Security Note

Never commit `.env`, `.pem`, AWS keys, or JWT secrets. If any secret was exposed, rotate it in AWS IAM or the relevant provider dashboard.
