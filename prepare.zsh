#!/bin/zsh

# Ścieka do folderu roboczego:
SCRIPTDIR=${0:a:h}

# Usunięcie plików z kwarantanny systemu MacOS:
sudo xattr -d com.apple.quarantine "$SCRIPTDIR/client.zsh"
sudo xattr -d com.apple.quarantine "$SCRIPTDIR/client.command"
sudo xattr -d com.apple.quarantine "$SCRIPTDIR/runtime/node-v20.18.1-darwin-arm64/bin/node"
sudo xattr -d com.apple.quarantine "$SCRIPTDIR/runtime/openjdk-jre-17.0.13-macosx-aarch64/bin/java"

# Nadanie uprawnień do uruchomienia:
sudo chmod +x "$SCRIPTDIR/client.zsh"
sudo chmod +x "$SCRIPTDIR/client.command"
sudo chmod +x "$SCRIPTDIR/runtime/node-v20.18.1-darwin-arm64/bin/node"
sudo chmod +x "$SCRIPTDIR/runtime/openjdk-jre-17.0.13-macosx-aarch64/bin/java"

# Wyczyszczenie konsoli:
clear && reset

# KONIEC
echo "Done :)"