const path = require('path');
const shell = require('shelljs');

function R(..._path) {
    return path.resolve(__dirname, '..', ..._path);
}

function removeTrash() {
    shell.rm('-rf', R('client/*.log'));
    shell.rm('-rf', R('client/logs/*'));
    shell.rm('-rf', R('client/crash-reports/*'));
    shell.rm('-rf', R('client/local/ftbchunks/data/*'));
}

function removeUserData() {
    shell.rm('-rf', R('client/usercache.json'));
    shell.rm('-rf', R('client/usernamecache.json'));
    shell.rm('-rf', R('client/.sl_password'));
    shell.rm('-rf', R('client/local/ftbchunks/data/*'));
    shell.rm('-rf', R('client/screenshots/*'));
}

function removeWorld() {
    shell.rm('-rf', R('temp/world'));
    shell.mkdir('-p', R('temp/world'));
    shell.mv('-f', R('client/saves/world/datapacks'), R('temp/world'));
    shell.mv('-f', R('client/saves/world/serverconfig'), R('temp/world'));
    shell.mv('-f', R('client/saves/world/level.dat'), R('temp/world'));
    shell.mv('-f', R('client/saves/world/icon.png'), R('temp/world'));
    shell.rm('-rf', R('client/saves/world'));
    shell.mkdir('-p', R('client/saves/world'));
    shell.mv('-f', R('temp/world/datapacks'), R('client/saves/world'));
    shell.mv('-f', R('temp/world/serverconfig'), R('client/saves/world'));
    shell.mv('-f', R('temp/world/level.dat'), R('client/saves/world'));
    shell.mv('-f', R('temp/world/icon.png'), R('client/saves/world'));
}

function main() {
    const args = process.argv;
    const l = args.length;
    for (let i = 0; i < l; i++) {
        const key = args[i];
        const value = args[i + 1];

        if (key === '--trash') {
            removeTrash();
        }

        if (key === '--user') {
            removeUserData();
        }

        if (key === '--world') {
            removeWorld();
        }
    }
}

setImmediate(main);