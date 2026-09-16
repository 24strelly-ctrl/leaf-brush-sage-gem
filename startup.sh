#!/bin/bash
# Startup script for Eternity Calls project
# Uses Node v20.20.2 for system consistency

export PATH="/Users/jypsee72/.nvm/versions/node/v20.20.2/bin:$PATH"

# Check if dev server is already running
if curl -s http://127.0.0.1:8080 > /dev/null 2>&1; then
    echo "Dev server is already running on http://127.0.0.1:8080"
    exit 0
fi

# Start the dev server
echo "Starting dev server with Node v20.20.2..."
cd "/Users/jypsee72/Desktop/Eternity_Calls/Private & Shared"
npm run dev &

# Wait for server to be ready
echo "Waiting for server to start..."
timeout=30
while [ $timeout -gt 0 ]; do
    if curl -s http://127.0.0.1:8080 > /dev/null 2>&1; then
        echo "Dev server is ready on http://127.0.0.1:8080"
        exit 0
    fi
    sleep 1
    timeout=$((timeout - 1))
done

echo "Server failed to start within 30 seconds"
exit 1