#!/bin/sh

echo "--- Starting Au Jardin de Lison (Production) ---"

# On active l'autorisation de migration pour cette session
export PAYLOAD_MIGRATE=true

if [ -f "./node_modules/payload/dist/bin.js" ]; then
    echo "Checking for pending migrations..."
    # On force la migration même en cas de changement destructif (pour le CI/CD)
    node ./node_modules/payload/dist/bin.js migrate --yes --force
else
    echo "Warning: Payload binary not found, relying on prodMigrations auto-check."
fi

echo "Starting Next.js server..."
node server.js
