#!/usr/bin/with-contenv bashio
set +u

export HUMIDIFIER_ID=$(bashio::config 'humidifier_id')
bashio::log.info "Humidifier ID configured as ${HUMIDIFIER_ID}."

export HUMIDIFIER_KEY=$(bashio::config 'humidifier_key')
bashio::log.info "Humidifier KEY configured as ${HUMIDIFIER_KEY}."

bashio::log.info "Starting bridge service."
npm run start
