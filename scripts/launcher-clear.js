const path = require('path');
const shell = require('shelljs');

function R(..._path) {
    return path.resolve(__dirname, '..', ..._path);
}

function removeTemp() {
    shell.rm('-rf', R('temp/*'));
}

removeTemp();