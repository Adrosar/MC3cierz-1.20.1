const path = require('path');
const readline = require('readline');
const shell = require('shelljs');

const ROOT = path.resolve(__dirname, '..');

const color = {
    reset: "\x1b[0m",
    fgGreen: "\x1b[32m",
    fgYellow: "\x1b[33m",
    fgRed: "\x1b[31m",
    fgBlue: "\x1b[34m",
    fgMagenta: "\x1b[35m",
    fgCyan: "\x1b[36m",
    fgWhite: "\x1b[37m"
}

function readInput(_done) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(color.fgYellow + "> ", (_input) => {
        rl.close();
        _done((_input + "").trim())
    });
}

function initServer() {
    console.log(color.reset);
    console.clear();
    require("./server-gls");
    setTimeout(() => {
        const cmd = `"${path.resolve(ROOT, 'temp/server-run.bat')}"`;
        shell.exec(cmd, {
            silent: false
        });
    }, 300);
}

function handleStartPage(_input) {
    switch (_input) {
        case "c":
            setImmediate(() => {
                require('./client-launch');
            });
            break;

        case "s":
            initServer();
            break;

        default:
            console.warn(color.fgRed + "Nie ma takiej opcji");
            readInput(handleStartPage);
            break;
    }
}

function readVersion() {
    const config = require("../package.json");
    if (config.version) {
        return config.version;
    }

    return "0.0.0"
}

function drawStartPage() {
    console.clear();
    console.log(color.fgGreen + "==== MC3cierz Steam " + readVersion() + " ======================================================");
    console.log();
    console.log("[c] Uruchom klienta gry");
    console.log("[s] Uruchom własny server");
    console.log();
    console.log("================================================================================" + color.reset);
    readInput(handleStartPage);
}

function main() {
    process.on('beforeExit', () => {
        console.log(color.reset);
    });

    setImmediate(drawStartPage);
}

main();