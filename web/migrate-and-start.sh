#!/bin/sh

echo "--- Starting Au Jardin de Lison (Production) ---"

# Tentative de migration automatique
if [ -f "./node_modules/payload/dist/bin.js" ]; then
    echo "Running Payload migrations..."
    # On passe --yes pour confirmer automatiquement les migrations
    node ./node_modules/payload/dist/bin.js migrations:migrate --yes
else
    echo "Warning: Payload binary not found at ./node_modules/payload/dist/bin.js, skipping auto-migration."
fi

echo "Starting Next.js server..."
node server.js
