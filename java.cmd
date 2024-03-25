:: Windows (CR LF) OEM 852

@ECHO OFF
SET WORKDIR=%~dp0
SET APPDATA=%WORKDIR%
SET BINDIR=%WORKDIR%
SET "TEMP=%WORKDIR%temp"
SET "TMP=%WORKDIR%temp"
"runtime\openjdk-17.0.8.1-win-x64\bin\java.exe" %*