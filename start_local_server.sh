#!/bin/bash
# Price Verifier - Local Web Server Starter (Mac/Linux)
# This script starts a local web server so you can test the app before uploading to GitHub

echo "Starting Price Verifier local server..."
echo ""
echo "Opening browser to http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

python3 -m http.server 8000
