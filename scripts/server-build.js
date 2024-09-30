const path = require("path");
const shell = require("shelljs");

function resolvePath(..._path) {
  return path.resolve(__dirname, "..", ..._path);
}

function main() {
  shell.cp("-rf", resolvePath("client/mods"), resolvePath("server"));
  shell.rm("-rf", resolvePath("server/mods/sodium*"));
  shell.rm("-rf", resolvePath("server/mods/starlight*"));
  shell.rm("-rf", resolvePath("server/mods/embeddium*"));

  shell.cp("-rf", resolvePath("client/config"), resolvePath("server"));
  shell.rm("-rf", resolvePath("server/config/sodium*"));
  shell.rm("-rf", resolvePath("server/config/starlight*"));
  shell.rm("-rf", resolvePath("server/config/embeddium*"));


  shell.mkdir("-p", resolvePath("server/world"));
  shell.cp(
    "-rf",
    resolvePath("client/saves/world/datapacks"),
    resolvePath("server/world")
  );
  shell.cp(
    "-rf",
    resolvePath("client/saves/world/serverconfig"),
    resolvePath("server/world")
  );
}

main()
