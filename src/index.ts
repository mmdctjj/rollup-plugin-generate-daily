import childProcess from "child_process";
import { type } from "os";
import { PluginOption } from "vite";
import createServer from "./sever";
import { Config } from "./types";

// 判断平台，win平台不支持grep
const isWin = type() === "Windows_NT";
const findStr = isWin ? "findstr" : "grep";

const userName = childProcess.execSync(`git config user.name`, {
  encoding: "utf-8",
});

const RollupPluginGenerateDaily = (config: Config): PluginOption => {
  return {
    name: "rollup-plugin-generate-daily",
    buildEnd: () => {
      const logs = childProcess.execSync(`git log`, { encoding: "utf-8" });

      const context = {
        logs,
        userName,
        port: config?.port ?? 3000,
        format: config?.format ?? "day",
      };

      createServer(context);
    },
  };
};

export default RollupPluginGenerateDaily;
