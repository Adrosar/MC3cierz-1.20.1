:: Windows (CR LF) OEM 852

@ECHO OFF

SET WORKDIR=%~dp0
SET APPDATA=%WORKDIR%
SET BINDIR=%WORKDIR%
SET "TEMP=%WORKDIR%temp"
SET "TMP=%WORKDIR%temp"

ECHO ùadowanie ... prosz© czekaÜ
"runtime\node-v20.11.1-win-x64\node.exe" "scripts\client-launch.js"
PAUSE