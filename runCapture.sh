#!/bin/bash

export CHROME_PATH=/usr/bin/chromium
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
export CHROMIUM_FLAGS="--disk-cache-dir=/dev/null --disk-cache-size=1"
node capture.js