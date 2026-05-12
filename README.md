# For The Boys: Mentor Site

A simple Node/Express landing site for the For The Boys Stoic Mentor concept.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Admin editor:

- Open `http://localhost:3000/admin`
- Local default password: `fortheboys`
- Set `ADMIN_PASSWORD` before deploying online.

## Render

Render can run this as a Node web service.

- Build command: `npm install`
- Start command: `npm start`
- Port: provided automatically through `process.env.PORT`
- Environment variable: `ADMIN_PASSWORD`

The included `render.yaml` can be used later when the project is pushed to GitHub.

The admin editor stores changes in `data/site-config.json` by default. On Render, the filesystem is ephemeral unless you attach a persistent disk or move this config to a database, so production admin changes can be lost on redeploys without persistent storage.
