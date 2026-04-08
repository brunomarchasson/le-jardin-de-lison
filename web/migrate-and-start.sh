#!/bin/sh

echo "--- Starting Au Jardin de Lison (Production) ---"

# On tente de lancer la commande de migration officielle de Payload 3.0
# Note: prodMigrations dans payload.config.ts s'occupe déjà de l'auto-migration au démarrage,
# mais exécuter 'payload migrate' explicitement est une sécurité supplémentaire recommandée.

if [ -f "./node_modules/payload/dist/bin.js" ]; then
    echo "Checking for pending migrations..."
    node ./node_modules/payload/dist/bin.js migrate --yes
else
    echo "Warning: Payload binary not found, relying on prodMigrations auto-check."
fi

echo "Starting Next.js server..."
node server.js
