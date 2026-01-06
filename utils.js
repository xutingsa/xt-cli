// utils.js

import fs from "fs-extra";
import ora from "ora";
import chalk from "chalk";
import path from "path";
import shell from "shelljs";
import logSymbols from "./logSymbols.js";


// 获取当前运行这个脚本的目录
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);


// 检测当前操作系统是否支持 Unicode
export function isUnicodeSupported() {
  // 操作系统平台是否为 win32（Windows）
  if (process.platform !== "win32") {
    // 判断 process.env.TERM 是否为 'linux'，
    // 这表示在 Linux 控制台（内核）环境中。
    return process.env.TERM !== "linux"; // Linux console (kernel)
  }

  return (
    Boolean(process.env.CI) || // 是否在持续集成环境中
    Boolean(process.env.WT_SESSION) || // Windows 终端环境（Windows Terminal）中的会话标识
    Boolean(process.env.TERMINUS_SUBLIME) || // Terminus 插件标识
    process.env.ConEmuTask === "{cmd::Cmder}" || // ConEmu 和 cmder 终端中的任务标识
    process.env.TERM_PROGRAM === "Terminus-Sublime" ||
    process.env.TERM_PROGRAM === "vscode" || // 终端程序的标识，可能是 'Terminus-Sublime' 或 'vscode'
    process.env.TERM === "xterm-256color" ||
    process.env.TERM === "alacritty" || // 终端类型，可能是 'xterm-256color' 或 'alacritty'
    process.env.TERMINAL_EMULATOR === "JetBrains-JediTerm" // 终端仿真器的标识，可能是 'JetBrains-JediTerm'
  );
}


// 删除文件夹
export async function removeDir(dir) {
  const spinner = ora({
    text: `正在删除文件夹${chalk.cyan(dir)}`,
    color: "yellow",
  }).start();

  try {
    await fs.remove(resolveApp(dir));
    spinner.succeed(chalk.greenBright(`删除文件夹${chalk.cyan(dir)}成功`));
  }
  catch (err) { 
    spinner.fail(chalk.redBright(`删除文件夹${chalk.cyan(dir)}失败`));
    console.log(err);
    return;
  }
}

export async function changePackageJson(name, info) {
  try {
    const pkg = await fs.readJson(resolveApp(`${name}/package.json`));

    Object.keys(info).forEach((item) => {
      if (item === "name") {
        pkg[item] = info[item] && info[item].trim() ? info[item].trim() : name;
      } else if (item === "keywords" && info[item] && info[item].trim()) {
        pkg[item] = info[item].split(",");
      } else if (info[item] && info[item].trim()) {
        pkg[item] = info[item];
      }
    });

    await fs.writeJson(resolveApp(`${name}/package.json`), pkg, { spaces: 2 });
  } catch (err) {
    console.log(
      logSymbols.error,
      chalk.red("对不起,修改自定义package.json失败,请手动修改")
    );
    console.log(err);
  }
}

export function npmInstall(dir) {
  const spinner = ora("正在安装依赖......").start();

  if (
    // 安装依赖
    shell.exec(`cd ${shell.pwd()}/${dir} && npm install --force -d`).code !== 0
  ) {
    console.log(
      logSymbols.error,
      chalk.yellowBright("对不起,依赖安装失败,请手动安装")
    );
    shell.exit(1);
  }
  spinner.succeed(chalk.greenBright("~~~依赖安装成功~~~"));
  spinner.succeed(chalk.greenBright("~~~项目创建完成~~~"));

  shell.exit(1);
}
