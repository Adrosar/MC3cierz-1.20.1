:: Windows (CR LF) OEM 852
MODE 85,25
@ECHO OFF

SET WORKDIR=%~dp0
SET APPDATA=%WORKDIR%
SET BINDIR=%WORKDIR%
SET "TEMP=%WORKDIR%temp"
SET "TMP=%WORKDIR%temp"

ECHO ùadowanie ... prosz© czekaÜ
"%WORKDIR%runtime\node-v20.11.1-win-x64\node.exe" "%WORKDIR%scripts\launcher-start.js"
