import { TileValue } from '../Enums/TileValue';

export interface CheckRow {
    isDone: boolean;
    winner: boolean;
}

export const getCheckRow = (tileValues: TileValue[]) => {

    if (tileValues[0] === tileValues[1] && tileValues[1] === tileValues[2].valueOf()
        && tileValues[0] !== TileValue.Empty ) {
        return{
            isDone: true,
            winner: tileValues[0]
        };
    } else {
        return{
            isDone: false,
            winner: null
        };
    }

};