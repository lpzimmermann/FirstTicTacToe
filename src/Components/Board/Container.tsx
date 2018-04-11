import * as React from 'react';
import Board from './Board';
import { TileValue } from '../../Enums/TileValue';
import Tile from './Tile';
import { getCheckRow } from '../../Logic/ResultChecker';

interface ContainerProps {

}

interface ContainerState {
    boardValues: TileValue[];
    finished: boolean;
}

class Container extends React.Component<ContainerProps, ContainerState> {

    constructor(props: ContainerProps) {
        super( props );

        const inits = [];

        for (let y = 0; y < 9; y++) {
            inits.push(TileValue.Empty);
        }

        this.state = {boardValues: inits, finished: false};

    }

    updateTileValue(position: number,  value: TileValue) {

        const {boardValues: boardValueList} = this.state;

        boardValueList[position] = value;

        const {isDone: done, winner: winningPlayer} = getCheckRow(boardValueList);

        if ( done ) {
            alert('The winner of the whole game is ' + winningPlayer);
        }

        this.setState({boardValues: boardValueList, finished: done});
    }

    createBoards() {

        const boards = [];

        for (let y = 0; y < 9; y++) {
            if (this.state.boardValues[y] !== TileValue.Empty) {
                boards.push(
                    <Tile tileValue={this.state.boardValues[y]} blocked={false}/>
                );
            } else {
                boards.push(
                    <Board updateTileValue={(tv) => this.updateTileValue(y, tv)} blocked={this.state.finished}/>
                );
            }
        }

        return boards;
    }

    render() {

        return(
            <div className={'container'}>
                {this.createBoards()}
            </div>
        );

    }

}

export default Container;