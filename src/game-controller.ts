import chalk from "chalk";
import prompt from "prompt";

import BoardController, { IBoard } from "./board";
import { Players } from "./players";

type IntegerType = "integer";

export default class GameController {
  board: IBoard;

  currentPlayer = Players.Player1;
  lastMove: number;

  start = async () => {
    this.board = new BoardController();
    this.board.displayBoard();

    await this.nextTurn();

    while (!this.checkWinner()) {
      this.currentPlayer =
        this.currentPlayer === Players.Player1
          ? Players.Player2
          : Players.Player1;
      await this.nextTurn();
    }
  };

  nextTurn = async () => {
    const columnNumberSchema = {
      name: "columnNumber",
      description: "Integer 1-7 required",
      type: "integer" as IntegerType,
      required: true,
      message:
        "Column number must be a number in range 1-7 and column should have available space",
      maximum: 7,
      minimum: 1,
      conform: (columnNumber: number) => this.board.checkSpace(columnNumber),
    };

    const message = `Please choose column number`;

    console.log("\n");
    console.log(chalk.blue(`${this.currentPlayer} turn.`));
    prompt.start({
      message: chalk.yellow(message),
    });

    const { columnNumber } = await prompt.get(columnNumberSchema);

    await this.board.dropDisc(this.currentPlayer, columnNumber as number);

    this.lastMove = columnNumber as number;
  };
  checkWinner = () => {
    return this.board.checkWinner();
  };
}
