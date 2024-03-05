import chalk from "chalk";
import clear from "clear";

import { Players } from "./players";

type CountsType = {
  horizontalCount: number;
  verticalCount: number;
  downDiagonalCount: number;
  upDiagonalCount: number;
};

type CountsTypes =
  | "horizontalCount"
  | "verticalCount"
  | "downDiagonalCount"
  | "upDiagonalCount";

const BOARD_WIDTH = 7;
const BOARD_HEIGHT = 6;

enum TokenType {
  Empty,
  Player1,
  Player2,
}

export interface IBoard {
  board: TokenType[][];
  displayBoard(): void;
  dropDisc(players: Players, columnNumber: number): Promise<void>;
  checkSpace(columnNumber: number): boolean;
  checkWinner(): boolean;
}

class BoardController {
  board = [
    [
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
    ],
    [
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
    ],
    [
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
    ],
    [
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
    ],
    [
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
    ],
    [
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
    ],
    [
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
      TokenType.Empty,
    ],
  ];

  lastMove = {
    token: TokenType.Empty,
    row: 0,
    columnNumber: 0,
  };

  displayBoard = () => {
    let columnNumbers = "";
    for (let j = 0; j < BOARD_WIDTH; j++) {
      columnNumbers += ` ${j + 1} `;
    }

    console.log(columnNumbers);

    for (let i = 0; i < BOARD_HEIGHT; i++) {
      let row = "";
      for (let j = 0; j < BOARD_WIDTH; j++) {
        switch (this.board[j][i]) {
          case TokenType.Player1:
            row += chalk.blue(" o ");
            break;
          case TokenType.Player2:
            row += chalk.red(" o ");
            break;
          default:
            row += " . ";
        }
      }
      console.log(row);
    }
  };

  dropDisc = async (player: Players, columnNumber: number) => {
    return new Promise<void>((resolve) => {
      let row = 0;
      const token =
        player === Players.Player1 ? TokenType.Player1 : TokenType.Player2;
      const arrayColumnNumber = columnNumber - 1;

      this.dropDiscRowByRow(token, arrayColumnNumber, row);

      const updateBoardInterval = setInterval(() => {
        row++;

        if (
          row === BOARD_HEIGHT ||
          this.board[arrayColumnNumber][row] !== TokenType.Empty
        ) {
          this.lastMove = {
            token,
            row: row - 1,
            columnNumber: arrayColumnNumber,
          };
          clearInterval(updateBoardInterval);
          resolve();
        } else {
          this.dropDiscRowByRow(token, arrayColumnNumber, row);
        }
      }, 250);
    });
  };

  private dropDiscRowByRow(
    token: TokenType,
    columnNumber: number,
    row = 0
  ): void {
    clear();
    if (row > 0) {
      this.board[columnNumber][row - 1] = TokenType.Empty;
    }

    this.board[columnNumber][row] = token;
    this.displayBoard();
  }

  checkSpace(columnNumber: number): boolean {
    return this.board[columnNumber - 1][0] === TokenType.Empty;
  }

  checkWinner(): boolean {
    const counts: CountsType = {
      horizontalCount: 0,
      verticalCount: 0,
      downDiagonalCount: 0,
      upDiagonalCount: 0,
    };
    const { token, row, columnNumber } = this.lastMove;

    const evaluateToken = (spot: TokenType, countName: CountsTypes) => {
      if (spot === token) {
        counts[countName]++;
        if (counts[countName] === 4) return true;
      } else {
        counts[countName] = 0;
      }

      return false;
    };

    for (
      let i = Math.max(columnNumber - 3, 0), j = Math.max(row - 3, 0);
      i < Math.min(columnNumber + 4, BOARD_WIDTH) ||
      j < Math.min(row + 4, BOARD_HEIGHT);
      i++, j++
    ) {
      if (evaluateToken(this.board[i][row], "horizontalCount")) return true;

      if (evaluateToken(this.board[columnNumber][j], "verticalCount"))
        return true;

      const downDiagonalRowIndex = row + (i - columnNumber);

      if (
        downDiagonalRowIndex > 0 &&
        downDiagonalRowIndex < BOARD_HEIGHT &&
        evaluateToken(this.board[i][downDiagonalRowIndex], "downDiagonalCount")
      ) {
        return true;
      }

      const upDiagonalRowIndex = row + (columnNumber - i);

      if (
        upDiagonalRowIndex > 0 &&
        upDiagonalRowIndex < BOARD_HEIGHT &&
        evaluateToken(this.board[i][upDiagonalRowIndex], "upDiagonalCount")
      ) {
        return true;
      }
    }

    return false;
  }
}

export default BoardController;
