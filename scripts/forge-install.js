const path = require('path');
const shell = require('shelljs');

function install() {
    const ROOT = path.resolve(__dirname, '..');
    console.log("[path] ROOT:", ROOT);

    const JAVA = path.resolve(ROOT, 'runtime/openjdk-17.0.8.1-win-x64/bin/java.exe');
    console.log("[path] JAVA:", JAVA);

    const FORGE = path.resolve(ROOT, 'resources/forge-1.20.1-47.2.0-installer.jar');
    console.log("[path] FORGE:", FORGE);

    console.log("");

    shell.exec(`"${JAVA}" -jar "${FORGE}"`);
}

setImmediate(install);