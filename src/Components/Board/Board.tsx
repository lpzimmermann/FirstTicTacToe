import * as React from 'react';
import Tile from './Tile';
import { getCheckRow } from '../../Logic/ResultChecker';
import { TileValue } from '../../Enums/TileValue';
import { Player } from '../../Enums/Player';

interface BoardProps {
    blocked: boolean;
    position: number;
    updateBoardValue( ps: number, tv: TileValue ): void;
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

        this.state = {tileValues: inits, finished: this.props.blocked, player: Player.Cross};

    }

    updateTileValue(position: number) {
        const {tileValues: tileInfos, player: playerValue} = this.state;
        var finished = false;

        tileInfos[position] = playerValue.valueOf();

        // Check if there's a Tic to the fckn Toe
        const {isDone: done, winner: winningPlayer} = getCheckRow(tileInfos);

        if ( done && winningPlayer !== null) {

            finished = true;
            alert('Player ' + winningPlayer + ' won!');

            this.props.updateBoardValue(this.props.position, winningPlayer.valueOf());

        } else if ( done && winningPlayer === null ) {
            finished = true;
        }

        var nextPlayer = (playerValue === Player.Cross ? Player.Circle : Player.Cross);

        this.setState({tileValues: tileInfos, finished: finished,
            player: nextPlayer});

    }

    createTiles() {

        const tiles = [];

        for (let y = 0; y < 9; y++) {

            tiles.push(
                <Tile
                    tileValue={this.state.tileValues[y]}
                    blocked={(this.props.blocked ? true : this.state.finished)}
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
