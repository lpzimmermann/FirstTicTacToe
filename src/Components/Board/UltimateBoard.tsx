import * as React from 'react';
import Board from './Board';
import { TileValue } from '../../Enums/TileValue';
import Tile from './Tile';
import { getCheckRow } from '../../Logic/ResultChecker';
import { Player } from '../../Enums/Player';

interface UltimateBoardProps {
    updateCurrentPlayer(): void;
    getCurrentPlayer(): Player;
    updateFinishedValue(isF: boolean): void;
    getFinishedValue(): boolean;
}

interface UltimateBoardState {
    boardValues: TileValue[];
    activeBoard: number;
}

class UltimateBoard extends React.Component<UltimateBoardProps, UltimateBoardState> {

    constructor(props: UltimateBoardProps) {
        super( props );

        this.updateBoardValue = this.updateBoardValue.bind(this);
        this.createBoards = this.createBoards.bind(this);
        this.updateActiveBoards = this.updateActiveBoards.bind(this);

        const inits = [];

        for (let y = 0; y < 9; y++) {
            inits.push(TileValue.Empty);
        }

        this.state = {boardValues: inits, activeBoard: 10};

    }

    updateBoardValue(position: number,  value: TileValue) {

        const {boardValues: boardValueList} = this.state;

        boardValueList[position] = value;

        const {isDone: done} = getCheckRow(boardValueList);

        let finished = this.props.getFinishedValue();

        if ( done ) {
             finished = true;
        }

        this.props.updateFinishedValue(finished);
        this.setState( { boardValues: boardValueList, activeBoard: this.state.activeBoard});
        return finished;
    }

    updateActiveBoards(position: number, finished: boolean) {

        if (finished) {
            return;
        }

        this.props.updateCurrentPlayer();

        if (this.state.boardValues[position] === TileValue.Empty) {

            this.setState( { boardValues: this.state.boardValues,
                activeBoard: position
            });

        } else {
            this.setState( { boardValues: this.state.boardValues,
                activeBoard: 10
            });
        }
    }

    createBoards() {

        const boards = [];

        for (let y = 0; y < 9; y++) {
            if (this.state.boardValues[y] !== TileValue.Empty) {
                boards.push(
                    <Tile tileValue={this.state.boardValues[y]} blocked={false} bigTile={true}/>
                );
            } else {
                boards.push(
                    <Board
                        updateBoardValue={this.updateBoardValue}
                        blocked={(this.props.getFinishedValue() === true ? true :
                            (this.state.activeBoard !== 10 && this.state.activeBoard !== y))}
                        position={y}
                        getCurrentPlayer={() => {
                            return this.props.getCurrentPlayer();
                        }}
                        updateActiveBoards={this.updateActiveBoards}
                    />
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

export default UltimateBoard;