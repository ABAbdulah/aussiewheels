# Deployment — Railway (API) + Vercel (web)

AussieWheels is two separate deployments:

| Service | Repo                           | Host     | URL shape                            |
|---------|--------------------------------|----------|--------------------------------------|
| API     | `aussiewheels-backend`          | Railway  | `https://<project>.up.railway.app`   |
| Web     | `aussiewheels` (this repo)      | Vercel   | `https://<project>.vercel.app`       |

They communicate over plain HTTPS — no shared secrets or private networking needed for MVP.

---

## 1. Railway (API)

### Environment variables

In the Railway service **Variables** tab, set:

| Key             | Value                                                                      |
|-----------------|----------------------------------------------------------------------------|
| `NODE_ENV`      | `production`                                                               |
| `LOG_LEVEL`     | `info`                                                                     |
| `CORS_ORIGIN`   | `https://<your-vercel-domain>.vercel.app,https://*.vercel.app`             |

Do **not** set `PORT` — Railway injects it automatically. Do **not** set `HOST` — the default `0.0.0.0` is correct.

`CORS_ORIGIN` is a comma-separated list. `*` is a wildcard matching a single URL segment, so `https://*.vercel.app` lets every Vercel preview deploy call the API. When you add a custom domain, append it to the list:

```
https://www.aussiewheels.com.au,https://aussiewheels.vercel.app,https://*.vercel.app
```

### Build & start commands

Railway auto-detects this from `package.json`:

- Build: `npm install && npm run build`
- Start: `npm start` → `node dist/server.js`

Node 22 is pinned via the `engines` field.

### Health check

Point Railway's health check at `/health`. It returns `{"status":"ok","service":"aussiewheels-backend"}`.

### Verifying

```bash
curl https://<project>.up.railway.app/health
curl https://<project>.up.railway.app/api/v1/listings?limit=1
```

---

## 2. Vercel (web)

### Environment variables

In Vercel **Settings → Environment Variables**, set for **Production, Preview, Development**:

| Key                    | Value                                         |
|------------------------|-----------------------------------------------|
| `NEXT_PUBLIC_APP_NAME` | `AussieWheels`                                |
| `NEXT_PUBLIC_API_URL`  | `https://<your-railway-subdomain>.up.railway.app` |

> **Important:** `NEXT_PUBLIC_*` vars are inlined at **build time**. After changing `NEXT_PUBLIC_API_URL`, trigger a redeploy (Deployments → ⋯ → Redeploy) or push a new commit — just saving the variable isn't enough.

No trailing slash — but `siteConfig.apiUrl` strips one defensively if you do paste it.

### Build settings

Vercel auto-detects Next.js. No overrides needed. Framework preset: **Next.js**.

### Verifying after deploy

1. Load `https://<project>.vercel.app` — the home page should render with live featured listings.
2. Open DevTools → Network, filter by `railway.app`. You should see a `GET` to `/api/v1/listings` returning 200.
3. If you see CORS errors in the console, your Vercel origin is not in `CORS_ORIGIN` on Railway — update it and restart the Railway service.

---

## 3. Local development (unchanged)

```bash
# terminal 1
cd aussiewheels-backend
cp .env.example .env   # once
npm run dev            # :4000

# terminal 2
cd aussiewheels
cp .env.example .env.local   # once
npm run dev                   # :3000
```

`.env.local` in the web repo keeps `NEXT_PUBLIC_API_URL=http://localhost:4000`, so local dev never touches Railway.

---

## 4. Common gotchas

- **CORS errors on Vercel** — `CORS_ORIGIN` on Railway doesn't include the Vercel domain. Fix: update the variable and let Railway restart the service.
- **Mixed-content errors** — `NEXT_PUBLIC_API_URL` is `http://…` on Vercel. Always use `https://` in production.
- **Stale API URL on Vercel** — you changed `NEXT_PUBLIC_API_URL` but didn't redeploy. Trigger a redeploy.
- **`502` from Railway** — the API crashed on boot. Check Railway logs; most commonly a missing env var or a build error.
- **Preview URLs rejected** — you set `CORS_ORIGIN` to only the production Vercel domain. Add `https://*.vercel.app` so preview deploys work.
