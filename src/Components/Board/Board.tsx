import * as React from 'react';
import Tile from './Tile';
// import { getCheckRow } from '../../Logic/ResultChecker';
import { TileValue } from '../../Enums/TileValue';
import { Player } from '../../Enums/Player';

interface BoardProps {

}

interface BoardState {
    tileValues: TileValue[];

    player: Player;
}

class Board extends React.Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
        super(props);

        const inits = [];

        for (let y = 0; y < 9; y++) {
            inits.push(TileValue.Empty);
        }

        this.state = {tileValues: inits, player: Player.Cross};

        this.createTiles();
    }

    updateTileValue(position: number) {
        const {tileValues: tileInfos, player: playerValue} = this.state;

        tileInfos[position] = playerValue.valueOf();

        this.setState({tileValues: tileInfos, player: (playerValue === Player.Cross ? Player.Circle : Player.Cross)});

        // Check if there's a Tic to the fckn Toe
        // const {isDone: done, winner: winningPlayer} = getCheckRow(tileInfos);
        // alert('Is game finished? ' + done + ' - Winning player: ' + winningPlayer );

    }

    createTiles() {

        const tiles = [];

        for (let y = 0; y < 9; y++) {

            tiles.push(
                <Tile
                    tileValue={this.state.tileValues[y]}
                    onClick={() => {
                                 this.updateTileValue(y);
                                 }
                             }
                />
            );
        }

        return tiles;
    }

    render() {

        return (
            <div className={`board`}>

            {this.createTiles()}

            </div>

        );
    }
}

export default Board;
