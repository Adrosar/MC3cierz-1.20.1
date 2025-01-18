#!/bin/zsh

export WORKDIR=${0:a:h}
export APPDATA=$WORKDIR
export BINDIR=$WORKDIR
export TEMP="$WORKDIR/temp"
export TMP=$TEMP

echo Proszę czekać. Trwa ładowanie ...
"$WORKDIR/runtime/node-v20.18.1-darwin-arm64/bin/node" "$WORKDIR/scripts/client-start.js"
# Apple M1 Pro (MacOS Sonoma 14.2.1) ........... ↑
