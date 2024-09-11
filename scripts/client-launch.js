const os = require("os");
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');
const mclc = require('minecraft-launcher-core');

const ROOT = path.resolve(__dirname, '..');
const CLIENT = path.resolve(ROOT, 'client');

const FORGE = path.resolve(ROOT, 'resources/forge-1.20.1-47.2.0-installer.jar');
const AUTH = path.resolve(os.homedir(), '.mc3cierz', 'tokens.json');
const PASS = path.resolve(ROOT, 'client/.sl_password');
const CACHE = path.resolve(ROOT, 'temp');
const JAVA = getJava(ROOT);

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

function getJava(_root) {
    if (process.platform === "win32") {
        return path.resolve(_root, 'runtime/openjdk-jre-17.0.12+7-windows-x64/bin/java.exe');
    }

    if (process.platform === "linux") {
        return path.resolve(_root, 'runtime/openjdk-jre-17.0.12+7-linux-x64/bin/java');
    }

    throw "Nieznany system operacyjny!";
}

function ensureFile(_done) {
    fs.exists(AUTH, (_exist) => {
        if (_exist) {
            _done();
        } else {
            const dir = path.dirname(AUTH);
            fs.mkdir(dir, {
                recursive: true
            }, (_error) => {
                if (_error) {
                    console.error("[config] Error dir:", _error);
                } else {
                    fs.writeFile(AUTH, "{}", {
                        encoding: "utf-8"
                    }, (_error) => {
                        if (_error) {
                            console.error("[config] Error create:", _error);
                        } else {
                            _done();
                        }
                    });
                }
            });
        }
    });
}

function loadConfig(_done) {
    fs.readFile(AUTH, 'utf-8', (_err, _data) => {
        if (_err) {
            console.error("[config] Error loading:", _err);
        } else {
            let result = null;

            try {
                result = JSON.parse(_data);
            } catch (_err) {
                console.error("[config] Error parsing:", _err);
                return;
            }

            _done(result);
        }
    });
}

function saveConfig(_cfg, _done) {
    let text = "";
    try {
        text = JSON.stringify(_cfg);
    } catch (_err) {
        console.error("[config] Error stringify:", _err);
        return;
    }

    fs.writeFile(AUTH, text, {
        encoding: "utf-8"
    }, (_err) => {
        if (_err) {
            console.error("[config] Error saving:", _err);
        } else {
            _done();
        }
    });
}

function initUserPass(_user, _done) {
    ensureFile(() => {
        loadConfig((_cfg) => {
            let pass = _cfg[_user]
            if (pass) {
                pass = (pass + "").trim();
            } else {
                pass = "";
            }

            if (pass) {
                writePass(pass, _done);
            } else {
                pass = crypto.randomUUID();
                _cfg[_user] = pass;
                saveConfig(_cfg, () => {
                    writePass(pass, _done);
                });
            }
        });
    });
}

function writePass(_pass, _done) {
    fs.writeFile(PASS, _pass, (_err) => {
        if (_err) {
            console.error("[pass] Password not saved");
        } else {
            _done();
        }
    });
}

function readUserName(_done) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(color.fgGreen + "Wpisz nazwę użytkownika i naciśnij [ENTER]: ", (_login) => {
        if (_login.length >= 6) {
            rl.close();
            _done(_login)
        } else {
            rl.close();
            console.log(color.fgRed + "Nazwa musi mieć 6 lub więcej znaków!");
            readUserName(_done);
        }
    });
}

function runClient(_userName) {
    console.clear();
    console.log(color.fgCyan);
    console.log("[client] User:", _userName);
    console.log("[path] ROOT:", ROOT);
    console.log("[path] CLIENT:", CLIENT);
    console.log("[path] JAVA:", JAVA);
    console.log("[path] FORGE:", FORGE);
    console.log("[path] CACHE:", CACHE);
    console.log(color.reset);

    const client = new mclc.Client();

    client.on('data', (_event) => {
        const text = (_event + "").trim();
        if (text.indexOf("/ERROR") > -1) {
            console.log(color.fgRed + "[error]", text);
        } else if (text.indexOf("/WARN") > -1) {
            console.log(color.fgYellow + "[warn]", text);
        } else {
            console.log(color.fgWhite + "[data]", text);
        }
    });

    client.on(color.fgYellow + 'debug', (_event) => {
        console.log("[debug]", _event);
    });

    client.on('download', (_event) => {
        console.log(color.fgGreen + "[download]", _event);
    });

    client.on('close', (_event) => {
        console.log(color.fgMagenta + "[close]", _event);
    });

    client.launch({
        javaPath: JAVA,
        root: CLIENT,
        forge: FORGE,
        cache: CACHE,
        authorization: mclc.Authenticator.getAuth(_userName, ""),
        customArgs: [
            `-Xss4M`,
            `-Xms512M`,
            `-Xmx6144M`
        ],
        customLaunchArgs: [
            `-Dfml.ignorePatchDiscrepancies=true`,
            `-Dfml.ignoreInvalidMinecraftCertificates=true`,
            `-Dfml.ignoreInvalidSignature=true`,
            `-Dfml.log.inTerminal=true`,
            `-Dfml.queryResult=confirm`,
            `-Dfml.readTimeout=300`
        ],
        version: {
            number: "1.20.1",
            type: "release"
        },
        memory: {
            min: "512M",
            max: "6144M"

        },
        window: {
            width: "1280",
            height: "720",
            fullscreen: false
        },
        overrides: {
            detached: false
        }
    });
}

function initClient() {
    console.clear();
    readUserName((_userName) => {
        initUserPass(_userName, () => {
            runClient(_userName);
        });
    });
}

initClient();
