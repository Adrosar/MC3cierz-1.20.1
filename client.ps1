# Windows (CR LF) ANSI
$env:WORKDIR = "$PSScriptRoot"
$env:APPDATA = $env:WORKDIR
$env:BINDIR = $env:WORKDIR
$env:TEMP = "$env:WORKDIR\temp"
$env:TMP = "$env:WORKDIR\temp"
Write-Output "�adowanie ... prosz� czeka�"
& "$env:WORKDIR\runtime\node-v20.11.1-win-x64\node.exe" "$env:WORKDIR\scripts\client-start.js"
Read-Host "Naci�nij dowolny klawisz, aby kontynuowa�..."
