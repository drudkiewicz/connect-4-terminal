import { Players } from "./players";
declare enum TokenType {
    Empty = 0,
    Player1 = 1,
    Player2 = 2
}
export interface IBoard {
    board: TokenType[][];
    displayBoard(): void;
    dropDisc(players: Players, columnNumber: number): void;
    checkSpace(columnNumber: number): boolean;
    checkWinner(): boolean;
}
declare class BoardController {
    board: TokenType[][];
    lastMove: {
        token: TokenType;
        row: number;
        columnNumber: number;
    };
    displayBoard: () => void;
    dropDisc: (player: Players, columnNumber: number) => Promise<void>;
    private dropDiscRowByRow;
    checkSpace(columnNumber: number): boolean;
    checkWinner(): boolean;
}
export default BoardController;
