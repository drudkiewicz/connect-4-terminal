import { IBoard } from "./board";
import { Players } from "./players";
export default class GameController {
    board: IBoard;
    currentPlayer: Players;
    lastMove: number;
    start: () => Promise<void>;
    nextTurn: () => Promise<void>;
    checkWinner: () => boolean;
}
