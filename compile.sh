#!/bin/bash
CURR_DIR="$(dirname "$0")"
cd $CURR_DIR
echo "COMPILING..."
tsc
echo "BROWSERIFY..."
browserify src/main.js -o asset/script.js
echo "MINIFY..."
uglifyjs asset/script.js > asset/script.min.js
echo "CLEANUP..."
find src -name "*.js" | xargs rm
