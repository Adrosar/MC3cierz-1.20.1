const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

function getRoot() {
    return path.resolve(__dirname, '..');
}

function getJava(_root) {
    if (process.platform === "win32") {
        return path.resolve(_root, 'runtime/openjdk-17.0.8.1-win-x64/bin/java.exe');
    }

    if (process.platform === "linux") {
        return path.resolve(_root, 'runtime/openjdk-jre-17.0.11+9-linux-x64/bin/java');
    }

    throw "Nieznany system operacyjny!";
}

function generateLaunchScript() {
    const ROOT = getRoot();
    console.log("[ROOT]", ROOT);

    const SERVER = path.resolve(ROOT, 'server');
    console.log("[SERVER]", SERVER);

    const JAVA = getJava(ROOT);
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

setImmediate(generateLaunchScript);