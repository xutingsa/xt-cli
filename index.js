#!/usr/bin/env node
import clone from "./gitclone.js"
import figlet from 'figlet';
import chalk from 'chalk';

console.log('\r\n' + chalk.greenBright.bold(figlet.textSync('xt-cli', {
  font: 'Standard',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 80,
  whitespaceBreak: true
})));
console.log(`\r\nRun ${chalk.cyan(`xt-cli <command> --help`)} for detailed usage of given command\r\n`)

await clone("yingside/vue-cli-template", "vue-cli-temp");