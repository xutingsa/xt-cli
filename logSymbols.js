import { isUnicodeSupported } from "./utils.js";
import chalk from "chalk";

const main = {
  info: chalk.blue("ℹ"),
  success: chalk.green("✔"),
  warning: chalk.yellow("⚠"),
  error: chalk.red("✖"),
  star: chalk.cyan("✵"),
  arrow: chalk.yellow("➦"),
  smile: chalk.yellow("☺"),
};

const fallback = {
  info: chalk.blue("i"),
  success: chalk.green("√"),
  warning: chalk.yellow("‼"),
  error: chalk.red("×"),
  star: chalk.cyan("*"),
  arrow: chalk.yellow("->"),
  smile: chalk.yellow(":)"),
};

const logSymbols = isUnicodeSupported() ? main : fallback;

export default logSymbols;
