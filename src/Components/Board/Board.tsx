import * as React from 'react';
import Tile from './Tile';
import { getCheckRow } from '../../Logic/ResultChecker';
import { TileValue } from '../../Enums/TileValue';
import { Player } from '../../Enums/Player';

interface BoardProps {

}

interface BoardState {
    tileValues: TileValue[];
    finished: boolean;
    player: Player;
}

class Board extends React.Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
        super(props);

        const inits = [];

        for (let y = 0; y < 9; y++) {
            inits.push(TileValue.Empty);
        }

        this.state = {tileValues: inits, finished: false, player: Player.Cross};

        this.createTiles();
    }

    updateTileValue(position: number) {
        const {tileValues: tileInfos, player: playerValue} = this.state;
        var finished = false;

        tileInfos[position] = playerValue.valueOf();

        // Check if there's a Tic to the fckn Toe
        const {isDone: done, winner: winningPlayer} = getCheckRow(tileInfos);

        var nextPlayer = (playerValue === Player.Cross ? Player.Circle : Player.Cross);
        if ( done && winningPlayer !== null) {
            finished = true;
            nextPlayer = winningPlayer;
            alert('Player ' + nextPlayer + ' won!');
        }

        this.setState({tileValues: tileInfos, finished: finished,
            player: nextPlayer});

    }

    createTiles() {

        const tiles = [];

        for (let y = 0; y < 9; y++) {

            tiles.push(
                <Tile
                    tileValue={this.state.tileValues[y]}
                    blocked={this.state.finished}
                    onClick={() => {
                                 this.updateTileValue(y);
                                 }
                             }
                />
            );
        }

        return tiles;
    }

    getWinnerLabel() {
        if (this.state.finished) {
            return(
                <p>The winner is {this.state.player}</p>
            );
        } else {
            return '';
        }
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
