#!/usr/bin/env node
// import clone from "./gitclone.js"
import figlet from "figlet";
import chalk from "chalk";
import { program } from "commander";
import { templates } from "./constants.js";
import fs from "fs-extra";
import initAction from "./initAction.js";
import logSymbols from "./logSymbols.js";
import {table} from "table";

const pkg = fs.readJSONSync(new URL("./package.json", import.meta.url));
console.log(pkg.version);

program.version(pkg.version, "-v, --version");

program
  .name("xt-cli")
  .description("自定义脚手架")
  .usage("<command> [options]")
  .on("--help", () => {
    // figlet -》  标题美化
    console.log(
      "\r\n" +
        chalk.greenBright.bold(
          figlet.textSync("xt-cli", {
            font: "Standard",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 80,
            whitespaceBreak: true,
          })
        )
    );
    console.log(
      `\r\nRun ${chalk.cyan(
        `${logSymbols.smile} xt-cli <command> --help`
      )} for detailed usage of given command\r\n`
    );
  });

program
  .command("create <app-name>")
  .description("创建新项目")
  .option("-t, --template [template]", "输入模板名称创建项目")
  .option("-f, --force", "强制覆盖本地同名项目")
  .option("-i, --ignore", "忽略项目相关描述,快速创建项目")
  .action(initAction);
// .action((name, option) => {
//   console.log(name)
//   console.log(option)
// })

program
  .command("list")
  .description("查看所有可用模板")
  .action(() => {
    //     console.log(chalk.yellowBright('模板列表'));
    // templates.forEach((temp, index) => {
    //   console.log(`(${index + 1}) | ${temp.name} | ${temp.value} | ${temp.desc}`)
    // })
    // 内容
    const data = templates.map((item) => [
      chalk.bold.yellowBright(item.name),
      item.value,
      item.desc,
    ]);
    // 表头
    data.unshift([
      chalk.yellowBright("模板名称"),
      chalk.yellowBright("模板地址"),
      chalk.yellowBright("模板描述"),
    ]);
    const config = {
      header: {
        alignment: "center",
        content: chalk.yellowBright(logSymbols.star + " 模板列表"),
      },
    };
    console.log(table(data, config));
  });

// 利用commander解析命令行输入，必须写在所有内容最后面
program.parse(process.argv);
