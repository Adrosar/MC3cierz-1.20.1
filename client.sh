#!/bin/bash

WORKDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
export APPDATA=$WORKDIR
export BINDIR=$WORKDIR
export TEMP="$WORKDIR/temp"
export TMP=$TEMP

echo Proszę czekać. Trwa ładowanie ...
"$WORKDIR/runtime/node-v20.14.0-linux-x64/bin/node" "$WORKDIR/scripts/client-launch.js"

