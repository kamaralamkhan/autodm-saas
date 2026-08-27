# InstaAuto Local Development Setup

This guide provides instructions on how to quickly spin up the InstaAuto local development environment.

## 🚀 One-Command Setup

Open Git Bash (or a bash-compatible terminal on Windows) and run:

```bash
bash scripts/dev-setup.sh
```

### What this script does:
1. Installs Node.js dependencies via `pnpm`.
2. Creates your `.env.local` file from `.env.local.example`.
3. Starts a local PostgreSQL database using Docker and applies `schema.sql` (if you have Docker installed).
4. Sets up `ngrok` (or `localtunnel`) to expose port 3000 to the public web (necessary for Instagram webhooks).
5. Starts the Next.js development server.

## 🔑 Adding Real Secrets

The initial `.env.local` uses placeholders and a `MOCK_TOKEN`. To use real Instagram and Supabase services, paste your actual keys into `.env.local`:

- **Supabase**: Paste your `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` from your Supabase dashboard.
- **Instagram**: Add your `INSTAGRAM_APP_ID`, `INSTAGRAM_APP_SECRET`, and a real `INSTAGRAM_ACCESS_TOKEN`. Once you remove `MOCK_TOKEN`, real Meta API calls and signature validation will be enforced.

## 🧪 Testing Webhooks Locally

With the server running and `ngrok` active, you can send simulated webhooks to `http://localhost:3000/api/instagram/webhook`. 

Check `logs/ngrok.url` to find your public tunnel address. Use this URL in the Meta Developer Dashboard to subscribe to webhooks!
