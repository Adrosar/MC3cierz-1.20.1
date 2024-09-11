#!/bin/bash

WORKDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
export APPDATA=$WORKDIR
export BINDIR=$WORKDIR
export TEMP="$WORKDIR/temp"
export TMP="$TEMP"
"$WORKDIR/runtime/openjdk-jre-17.0.12+7-linux-x64/bin/java" $@
