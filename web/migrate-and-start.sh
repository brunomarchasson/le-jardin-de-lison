#!/bin/sh

echo "--- Starting Au Jardin de Lison (Production) ---"

# On tente la migration via la CLI avec force avant de lancer le serveur
# Cela permet de répondre "Oui" automatiquement à toutes les questions de perte de données
echo "Checking for pending migrations..."
npx payload migrate --yes --force

echo "Starting Next.js server..."
# On lance le serveur SANS la variable PAYLOAD_MIGRATE 
# pour que le serveur lui-même ne tente rien et ne bloque pas
node server.js
