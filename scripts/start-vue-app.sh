#!/bin/bash
# Script för att starta Vue-appen med korrekt Node-version

echo "🚀 Startar FKUI Vue-applikationen..."

# Kontrollera att nvm finns
if ! command -v nvm &> /dev/null; then
    echo "❌ nvm inte installerat. Installera nvm först."
    exit 1
fi

# Ladda nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Använd Node 22
echo "📦 Växlar till Node.js 22..."
nvm use 22

# Kontrollera version
echo "✅ Node version: $(node -v)"
echo "✅ npm version: $(npm -v)"

# Rensa cache och starta
echo "🧹 Rensar Vite cache..."
rm -rf node_modules/.vite

echo "🌟 Startar utvecklingsservern..."
npm start