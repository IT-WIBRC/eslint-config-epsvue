import chalk from "chalk";

export const logger = {
  info: (message) => console.log(chalk.blue(message)),
  warning: (message) => console.warn(chalk.yellow(message)),
  error: (message) => console.error(chalk.red(message)),
  success: (message) => console.log(chalk.green(message)),
};
