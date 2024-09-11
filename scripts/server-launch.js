const path = require('path');
const shell = require('shelljs');

function getRoot() {
    return path.resolve(__dirname, '..');
}

function getJava(_root) {
    if (process.platform === "win32") {
        return path.resolve(_root, 'runtime/openjdk-jre-17.0.12+7-windows-x64/bin/java.exe');
    }

    if (process.platform === "linux") {
        return path.resolve(_root, 'runtime/openjdk-jre-17.0.12+7-linux-x64/bin/java');
    }

    throw "Nieznany system operacyjny!";
}

function getArgsFile() {
    if (process.platform === 'win32') {
        return `win_args.txt`;
    } else if (process.platform === 'linux') {
        return `unix_args.txt`;
    } else {
        throw "Nieznany system operacyjny!";
    }
}

function run() {
    const ROOT = getRoot();
    console.log("[ROOT]", ROOT);

    const SERVER = path.resolve(ROOT, 'server');
    console.log("[SERVER]", SERVER);

    const JAVA = getJava(ROOT);
    console.log("[JAVA]", JAVA);

    const command = `cd "${SERVER}" && "${JAVA}" @user_jvm_args.txt @libraries/net/minecraftforge/forge/1.20.1-47.2.0/${getArgsFile()} nogui`;

    console.log("");
    console.log("[CMD]", command);
    console.log("");

    shell.exec(command, {
        async: false,
        fatal: true,
        encoding: 'utf8'
    });
}

run();