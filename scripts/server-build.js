const path = require("path");
const shell = require("shelljs");

function resolvePath(..._path) {
  return path.resolve(__dirname, "..", ..._path);
}

function build() {
  shell.cp("-rf", resolvePath("client/mods"), resolvePath("server"));
  shell.rm("-rf", resolvePath("server/mods/entityculling*"));
  shell.rm("-rf", resolvePath("server/mods/dynamiclightsreforged*"));
  shell.rm("-rf", resolvePath("server/mods/FpsReducer*"));
  shell.rm("-rf", resolvePath("server/mods/smoothboot*"));
  shell.rm("-rf", resolvePath("server/mods/textrues_embeddium_options*"));

  shell.cp("-rf", resolvePath("client/config"), resolvePath("server"));
  shell.rm("-rf", resolvePath("server/config/entityculling*"));
  shell.rm("-rf", resolvePath("server/config/dynamiclightsreforged*"));
  shell.rm("-rf", resolvePath("server/config/FpsReducer*"));
  shell.rm("-rf", resolvePath("server/config/smoothboot*"));
  shell.rm("-rf", resolvePath("server/config/textrues_embeddium_options*"));

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

setImmediate(build);
