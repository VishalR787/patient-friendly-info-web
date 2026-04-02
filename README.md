# PatientFriendlyInfo

PatientFriendlyInfo is a full-stack health-tech app that converts medical lab reports into plain, patient-friendly explanations.

## Tech Stack
- Frontend: React + Vite + React Router
- Backend: Node.js + Express
- AI explanation: Ollama (local model, fallback supported)

## Project Structure
- `frontend/` - React app (landing page, analyzer input, demo/results)
- `backend/` - Express API (`/api/analyse`, `/api/demo`)

## Prerequisites
- Node.js 18+
- npm
- Optional: Ollama running locally for AI-generated explanations

## 1) Install Dependencies

### Frontend
```bash
cd frontend
npm install
```

### Backend
```bash
cd ../backend
npm install
```

## 2) Environment Variables
Create a `.env` file inside `backend/`:

```env
PORT=5000
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama3
FRONTEND_URL=http://localhost:5173
```

Frontend API base is read from:
- `VITE_API_BASE_URL` (optional)
- defaults to `/api` if not set

## 3) Run Locally

### Start backend
```bash
cd backend
npm run dev
```

### Start frontend (new terminal)
```bash
cd frontend
npm run dev
```

Frontend: `http://localhost:5173`

## API Endpoints
- `POST /api/analyse` - analyze pasted report text
- `GET /api/demo` - demo analysis payload

## Build Frontend
```bash
cd frontend
npm run build
```

## Deploy

### Frontend on Vercel
1. Import repo in Vercel.
2. Set **Root Directory** to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add env var:
   - `VITE_API_BASE_URL=https://<your-backend-domain>/api`

`frontend/vercel.json` already includes SPA rewrite to `index.html`.

### Backend
Deploy `backend/` separately (Render/Railway/Fly/etc.) and set CORS `FRONTEND_URL` to your Vercel frontend URL.

## Routes (Frontend)
- `/` - landing page
- `/app` - report analyzer input page
- `/demo` - results/demo page
- `/patientfriendlyinfo` - landing page alias
- `/vips` - alternate page
