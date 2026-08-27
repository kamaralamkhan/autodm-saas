#!/usr/bin/env bash
set -e

echo "🚀 Starting InstaAuto local dev setup..."

# Check Node version
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install Node 18 or higher."
  exit 1
fi
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "❌ Node version is too old. Please use Node 18+ (current: $NODE_VERSION)."
  exit 1
fi

# Ensure pnpm is installed
if ! command -v pnpm &> /dev/null; then
  echo "📦 Installing pnpm globally..."
  npm install -g pnpm
fi

echo "📦 Installing dependencies..."
pnpm install

echo "🛠️ Creating .env.local..."
if [ ! -f ".env.local" ]; then
  cp .env.local.example .env.local
  echo "✅ Copied .env.local.example to .env.local"
else
  echo "✅ .env.local already exists"
fi

# Start Postgres database using Docker Compose
if ! command -v docker &> /dev/null; then
  echo "⚠️ Docker is not installed. Skipping local database setup."
  echo "   You must configure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to point to a live database."
else
  echo "🐳 Starting local Postgres database..."
  docker compose up -d
  echo "✅ Database started at localhost:5432 with schema and mock data applied."
fi

# Install and start ngrok if not present
if ! command -v ngrok &> /dev/null; then
  echo "🚇 Installing localtunnel as fallback for ngrok (npm install -g localtunnel)..."
  npm install -g localtunnel
  echo "🚇 Starting localtunnel on port 3000..."
  lt --port 3000 > logs/ngrok.url &
else
  echo "🚇 Starting ngrok on port 3000..."
  ngrok http 3000 > /dev/null &
  sleep 2
  curl -s http://127.0.0.1:4040/api/tunnels | grep -o '"public_url":"[^"]*"' | head -n 1 | cut -d'"' -f4 > logs/ngrok.url
  echo "✅ ngrok started at $(cat logs/ngrok.url)"
fi

echo "🚀 Starting Next.js development server..."
pnpm run dev
