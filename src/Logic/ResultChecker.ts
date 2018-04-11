import { TileValue } from '../Enums/TileValue';
import { Player } from '../Enums/Player';

export interface CheckRow {
    isDone: boolean;
    winner: Player;
}

export const getCheckRow = (tileValues: TileValue[]) => {

    for (let y = 0; y < 3; y++) {
        if (tileValues[0 + (3 * y)] === tileValues[1 + (3 * y)] && tileValues[1 + (3 * y)] === tileValues[2 + (3 * y)]
            && tileValues[0 + (3 * y)] !== TileValue.Empty ) {
            return {
                isDone: true,
                winner: tileValues[0 + (3 * y)].valueOf()
            };
        } else if (tileValues[y] === tileValues[y + 3] && tileValues[y + 3] === tileValues[y + 6]
            && tileValues[y] !== TileValue.Empty ) {
            return{
                isDone: true,
                winner: tileValues[y].valueOf()
            };
        }
    }

    if (tileValues[0] === tileValues[4] && tileValues[4] === tileValues[8] &&
    tileValues[0] !== TileValue.Empty) {
        return{
            isDone: true,
            winner: tileValues[0].valueOf()
        };
    } else if (tileValues[2] === tileValues[4] && tileValues[4] === tileValues[6] &&
        tileValues[2] !== TileValue.Empty) {
        return{
            isDone: true,
            winner: tileValues[2].valueOf()
        };
    }

    var isDone = true;
    for (let y = 0; y < tileValues.length; y++) {
        if (tileValues[y] === TileValue.Empty) {
            isDone = false;
            break;
        }
    }

    return {
        isDone: isDone,
        winner: null
    };

};