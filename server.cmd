:: Windows (CR LF) OEM 852

@ECHO OFF
SET WORKDIR=%~dp0
SET APPDATA=%WORKDIR%
SET BINDIR=%WORKDIR%
SET "TEMP=%WORKDIR%temp"
SET "TMP=%WORKDIR%temp"
"runtime\node-v20.11.1-win-x64\node.exe" "scripts\server-gls.js" && "temp\server-run.bat"
PAUSE