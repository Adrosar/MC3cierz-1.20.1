#!/bin/bash

# Ścieka do folderu roboczego:
SCRIPTDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# Nadanie uprawnień do uruchomienia:
sudo chmod +x "$SCRIPTDIR/client.sh"
sudo chmod +x "$SCRIPTDIR/client-nvidia.sh"
sudo chmod +x "$SCRIPTDIR/runtime/node-v20.14.0-linux-x64/bin/node"
sudo chmod +x "$SCRIPTDIR/runtime/openjdk-jre-17.0.12+7-linux-x64/bin/java"

# Wyczyszczenie konsoli:
clear && reset

# KONIEC
echo "Done :)"