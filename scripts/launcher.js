const path = require("path");
const readline = require("readline");

const color = {
  reset: "\x1b[0m",
  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgRed: "\x1b[31m",
  fgBlue: "\x1b[34m",
  fgMagenta: "\x1b[35m",
  fgCyan: "\x1b[36m",
  fgWhite: "\x1b[37m",
};

function printColor(_color, _msg) {
  process.stdout.write(_color + _msg + color.reset + "\n");
}

function backupArray(_array) {
  _array.__backup__ = [..._array];
}

function restoreArray(_array) {
  if (!_array.__backup__) return;
  _array.length = 0;
  _array.push(..._array.__backup__);
  delete _array.__backup__;
}

function runScript(_scriptSrc, _args) {
  if (_args) backupArray(process.argv);
  if (_args) process.argv.push(..._args);
  require(_scriptSrc);
  const name = require.resolve(_scriptSrc);
  delete require.cache[name];
  if (_args) restoreArray(process.argv);
}

function readInput(_done) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(color.fgYellow + "> ", (_input) => {
    rl.close();
    _done((_input + "").trim());
  });
}

function readVersion() {
  const config = require("../package.json");
  if (config.version) {
    return config.version;
  }

  return "0.0.0";
}

function runClient() {
  console.clear();
  runScript("./client-launch.js");
}

function clearClient(_mode) {
  if (_mode === 1) {
    printColor(color.fgCyan, "  └ Trwa usuwanie ...");
    runScript("./client-clear.js", ["--trash"]);
    printColor(color.fgCyan, "  └ Usunięto logi z klienta gry!");
    setTimeout(initHomepage, 2000);
  } else if (_mode === 2) {
    printColor(color.fgCyan, "  └ Trwa usuwanie ...");
    runScript("./client-clear.js", ["--trash", "--user"]);
    printColor(
      color.fgCyan,
      "  └ Usunięto logi i pliki tymczasowe z klienta gry!"
    );
    setTimeout(initHomepage, 2000);
  } else if (_mode === 3) {
    printColor(color.fgCyan, "  └ Trwa usuwanie ...");
    runScript("./client-clear.js", ["--trash", "--user", "--world"]);
    printColor(
      color.fgCyan,
      "  └ Usunięto logi, pliki tymczasowe,\n    a główny świat 'world' przywrócono do stanu początkowego."
    );
    setTimeout(initHomepage, 2000);
  }
}

function buildServer() {
  // ToDo ...
}

function closeLauncher() {
  setTimeout(() => {
    process.stdout.write(color.fgRed);
  }, 100);

  setTimeout(() => {
    process.stdout.write("  └ 3");
  }, 100);

  setTimeout(() => {
    process.stdout.write(" 2");
  }, 1000);

  setTimeout(() => {
    process.stdout.write(" 1");
  }, 2000);

  setTimeout(() => {
    console.log(color.reset);
    console.clear();
    process.exit(0);
  }, 2100);
}

function runServer() {
  // ToDo ...
}

function clearServer() {
  // ToDo ...
}

const optionsForHomepage = {
  q: closeLauncher,
  l: runClient,
  c: clearClient.bind(null, 1),
  r: clearClient.bind(null, 2),
  p: clearClient.bind(null, 3),
  b: buildServer,
  s: runServer,
  t: clearServer,
};

function handleHomepage(_input) {
  const fn = optionsForHomepage[_input];
  if (typeof fn === "function") {
    fn();
  } else {
    initHomepage();
  }
}

function drawHomepage() {
  console.clear();
  console.log(
    color.fgGreen +
      "▬▬▬ MC3cierz (1.20.1) " +
      readVersion() +
      " ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
  );
  console.log();
  console.log("► CLIENT");
  console.log(" [l] Uruchom grę Minecraft");
  console.log(" [c] └ Usuń logi");
  console.log(" [r] └ Usuń logi i dane użytkownika");
  console.log(" [p] └ Usuń logi, dane użytkownika i zapisane stany");
  console.log();
  console.log("► SERVER");
  console.log(" [b] Skopiuj modyfikacje wraz z konfiguracją do server'a");
  console.log(" [s] └ Uruchom własny server pod adresem 127.0.0.1:25565");
  console.log(" [t] └ Usuń logi i pliki tymczasowe");
  console.log(
    " [d] └ Usuń logi, pliki tymczasowe, stany gry i modyfikacje wraz z konfiguracją"
  );
  console.log();
  console.log("► LAUNCHER");
  console.log(" [q] Wyjdź");
  console.log();
  console.log(
    "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬" +
      color.reset
  );
}

function initHomepage() {
  drawHomepage();
  readInput(handleHomepage);
}

function main() {
  process.on("beforeExit", () => {
    console.log(color.reset);
  });

  initHomepage();
}

main();
