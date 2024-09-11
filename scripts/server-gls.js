const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

function generateLaunchScript() {
    const ROOT = path.resolve(__dirname, '..');
    console.log("[ROOT]", ROOT);

    const SERVER = path.resolve(ROOT, 'server');
    console.log("[SERVER]", SERVER);

    let JAVA = "";
    if (process.platform === "win32") {
        JAVA = path.resolve(ROOT, 'runtime/openjdk-jre-17.0.12+7-windows-x64/bin/java.exe');
    } else {
        JAVA = path.resolve(ROOT, 'runtime/openjdk-jre-17.0.12+7-linux-x64/bin/java');
    }

    console.log("[JAVA]", JAVA);

    let fileName = 'temp/server-run';
    let command = `cd "${SERVER}" && "${JAVA}" @user_jvm_args.txt `;
    command += `@libraries/net/minecraftforge/forge/1.20.1-47.2.0/`;

    if (process.platform === 'win32') {
        fileName += `.bat`;
        command += `win_args.txt `;
    } else {
        fileName += `.sh`;
        command += `unix_args.txt `;
    }

    command += `nogui`;

    console.log("[FILE]", fileName);
    console.log("[CMD]", command);
    console.log("");

    shell.mkdir('-p', path.resolve(ROOT, 'temp'));
    fs.writeFileSync(path.resolve(ROOT, fileName), command);
}

generateLaunchScript();