import * as React from 'react';
import Tile from './Tile';
import { getCheckRow } from '../../Logic/ResultChecker';
import { TileValue } from '../../Enums/TileValue';
import { Player } from '../../Enums/Player';

interface BoardProps {
    blocked: boolean;
    position: number;
    updateBoardValue( ps: number, tv: TileValue ): boolean;
    getCurrentPlayer(): Player;
    updateActiveBoards( ps: number, finished: boolean): void;
}

interface BoardState {
    tileValues: TileValue[];
    finished: boolean;
}

class Board extends React.Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
        super(props);

        const inits = [];

        for (let y = 0; y < 9; y++) {
            inits.push(TileValue.Empty);
        }

        this.state = {tileValues: inits, finished: this.props.blocked};

    }

    updateTileValue(position: number) {
        const {tileValues: tileInfos} = this.state;
        var finished = false;

        tileInfos[position] = this.props.getCurrentPlayer().valueOf();

        const {isDone: done, winner: winningPlayer} = getCheckRow(tileInfos);
        let globalFinished = false;

        if ( done && winningPlayer !== null) {

            finished = true;
            globalFinished = this.props.updateBoardValue(this.props.position, winningPlayer.valueOf());

        } else if ( done && winningPlayer === null ) {
            finished = true;
        }

        this.props.updateActiveBoards(position, globalFinished);

        this.setState({tileValues: tileInfos, finished: (finished || this.props.blocked)});

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
                    bigTile={false}
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
