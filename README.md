# FTB Web App Pilot

Mobile-first React/Vite prototype for the FTB "For The Boys" mentor app concept.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Production Build

```bash
npm run build
npm start
```

`server.js` serves the built `dist` folder and exposes `/health` for Render.

## Prototype Scope

- No login or user accounts
- No backend app API
- No database
- No real AI integration
- No payment processing
- Demo state is stored only in browser localStorage using `ftb_*` keys
- Support is always accessible and is never behind pricing

## Render

Render can run this as a Node web service.

- Build command: `npm install && npm run build`
- Start command: `npm start`
- Port: provided automatically through `process.env.PORT`
