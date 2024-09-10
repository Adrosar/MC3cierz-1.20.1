const path = require('path');
const shell = require('shelljs');

function R(..._path) {
    return path.resolve(__dirname, '..', ..._path);
}

function removeLogs() {
    shell.rm('-rf', R('server/logs/*'));
    shell.rm('-rf', R('server/*.log'));
}

function removeWorld() {
    shell.rm('-rf', R('server/world'));
    shell.rm('-rf', R('server/local'));
    shell.rm('-rf', R('server/ops.json'));
    shell.rm('-rf', R('server/usercache.json'));
    shell.rm('-rf', R('server/usernamecache.json'));
    shell.rm('-rf', R('server/whitelist.json'));
}

function removeMods() {
    shell.rm('-rf', R('server/defaultconfigs'));
    shell.rm('-rf', R('server/mods'));
    shell.rm('-rf', R('server/config'));
}

function main() {
    const args = process.argv;
    const l = args.length;
    for (let i = 0; i < l; i++) {
        const key = args[i];
        const value = args[i + 1];

        if (key === '--logs') {
            removeLogs();
        }

        if (key === '--world') {
            removeWorld();
        }

        if (key === '--mods') {
            removeMods();
        }
    }
}

setImmediate(main);