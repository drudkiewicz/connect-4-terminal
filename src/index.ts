#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";

import GameController from "./game-controller";

clear();
console.log(
  chalk.cyan.bold(
    figlet.textSync("Connect 4 in CLI", { horizontalLayout: "full" })
  )
);

const game = new GameController();

game.start();
