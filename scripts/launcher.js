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
  console.log(color.reset);
  console.clear();
  runScript("./client-launch.js");
}

function clearClient(_mode) {
  if (_mode === 1) {
    printColor(color.fgCyan, "  └ Trwa usuwanie ...");
    runScript("./client-clear.js", ["--logs"]);
    printColor(color.fgCyan, "  └ Usunięto logi z klienta gry!");
    setTimeout(initHomepage, 2000);
  } else if (_mode === 2) {
    printColor(color.fgCyan, "  └ Trwa usuwanie ...");
    runScript("./client-clear.js", ["--logs", "--user"]);
    printColor(
      color.fgCyan,
      "  └ Usunięto logi i pliki tymczasowe z klienta gry!"
    );
    setTimeout(initHomepage, 2000);
  } else if (_mode === 3) {
    printColor(color.fgCyan, "  └ Trwa usuwanie ...");
    runScript("./client-clear.js", ["--logs", "--user", "--world"]);
    printColor(
      color.fgCyan,
      "  └ Usunięto logi, pliki tymczasowe,\n    a główny świat 'world' przywrócono do stanu początkowego."
    );
    setTimeout(initHomepage, 2000);
  }
}

function buildServer() {
  printColor(color.fgCyan, "  └ Trwa budowanie ...");
  runScript("./server-build.js");
  printColor(color.fgCyan, "  └ Server jest gotowy do uruchomienia");
  setTimeout(initHomepage, 2000);
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
  console.log(color.reset);
  console.clear();
  runScript("./server-launch.js");
}

function clearServer(_mode) {
  if (_mode === 1) {
    printColor(color.fgCyan, "  └ Trwa usuwanie ...");
    runScript("./server-clear.js", ["--logs"]);
    printColor(color.fgCyan, "  └ Usunięto logi z server'a gry!");
    setTimeout(initHomepage, 2000);
  } else if (_mode === 2) {
    printColor(color.fgCyan, "  └ Trwa usuwanie ...");
    runScript("./server-clear.js", ["--logs", "--world"]);
    printColor(color.fgCyan, "  └ Usunięto logi i zapis świata z server'a gry!");
    setTimeout(initHomepage, 2000);
  } else if (_mode === 3) {
    printColor(color.fgCyan, "  └ Trwa usuwanie ...");
    runScript("./server-clear.js", ["--logs", "--world", "--mods"]);
    printColor(color.fgCyan, "  └ Usunięto logi, zapis świata i wszystkie modyfikacje z server'a gry!");
    setTimeout(initHomepage, 2000);
  }
}

function clearTemp() {
  printColor(color.fgCyan, "  └ Trwa czyszczenie folderu TEMP");
  runScript("./launcher-clear.js");
  printColor(color.fgCyan, "  └ Usunięto zawartość folderu TEMP");
  setTimeout(initHomepage, 2000);
}

const optionsForHomepage = {
  l: runClient,
  c: clearClient.bind(null, 1),
  r: clearClient.bind(null, 2),
  p: clearClient.bind(null, 3),
  b: buildServer,
  s: runServer,
  t: clearServer.bind(null, 1),
  d: clearServer.bind(null, 2),
  x: clearServer.bind(null, 3),
  y: clearTemp,
  q: closeLauncher,
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
  console.log(" [l] ▪ Uruchom grę Minecraft");
  console.log(" [c] └ Usuń logi");
  console.log(" [r] └ Usuń logi i dane użytkownika");
  console.log(" [p] └ Usuń logi, dane użytkownika i save-y");
  console.log();
  console.log("► SERVER");
  console.log(" [b] ┌ Skopiuj modyfikacje wraz z konfiguracją do server'a");
  console.log(" [s] ▪ Uruchom server pod adresem 127.0.0.1:25565");
  console.log(" [t] └ Usuń logi");
  console.log(
    " [d] └ Usuń logi, pliki CACHE i cały świat"
  );
  console.log(
    " [x] └ Usuń logi, pliki CACHE, cały świat i wszystkie modyfikacje"
  );
  console.log();
  console.log("► LAUNCHER");
  console.log(" [y] ▪ Wyczyść folder TEMP");
  console.log(" [q] ▪ Wyjdź z launcher'a");
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
