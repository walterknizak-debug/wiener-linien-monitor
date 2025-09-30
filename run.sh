#!/usr/bin/with-contenv bashio

# Get configuration
STATIONS=$(bashio::config 'stations')
LINES=$(bashio::config 'lines')
REFRESH_INTERVAL=$(bashio::config 'refresh_interval')
THEME=$(bashio::config 'theme')

bashio::log.info "Starting Wiener Linien Monitor..."
bashio::log.info "Refresh interval: ${REFRESH_INTERVAL} seconds"
bashio::log.info "Theme: ${THEME}"

# Update configuration in app.js
cd /app

# Start the Node.js server
bashio::log.info "Starting web server on port 8000..."
node server.js