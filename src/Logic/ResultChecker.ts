import { TileValue } from '../Enums/TileValue';
import { Player } from '../Enums/Player';

export interface CheckRow {
    isDone: boolean;
    winner: Player;
}

export const getCheckRow = (tileValues: TileValue[]) => {

    for (let y = 0; y < 3; y++) {
        if (tileValues[y] === tileValues[y + 1] && tileValues[y + 1] === tileValues[y + 2].valueOf()
            && tileValues[y] !== TileValue.Empty ) {
            return {
                isDone: true,
                winner: tileValues[y].valueOf()
            };
        }
    }

    return {
        isDone: false,
        winner: null
    };

};