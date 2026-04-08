#!/bin/sh

echo "--- Starting Au Jardin de Lison (Production) ---"

# On laisse Payload gérer les migrations automatiquement au démarrage
# via la propriété 'prodMigrations' dans payload.config.ts

echo "Starting Next.js server..."
node server.js
