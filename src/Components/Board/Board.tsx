import * as React from 'react';
import Tile from './Tile';

interface BoardProps {

}

interface BoardState {
    isFree: boolean[];
    isCircle: boolean[];

    player: number;
}

class Board extends React.Component<BoardProps, BoardState> {

    constructor(props: BoardProps) {
        super(props);

        const inits = [];
        for (let y = 0; y < 9; y++) {
            inits.push(true);
        }

        this.state = {isFree: inits, isCircle: inits, player: 0};

        this.createTiles();
    }

    updateTileValue(position: number, isCircle: boolean) {
        const {isFree: freeValues, isCircle: circleValues, player: playerValue} = this.state;

        const newFree = [];
        const newCircle = [];
        var newPlayer = playerValue;

        for (let y = 0; y < 9; y++) {
            if (position === y) {

                newFree.push(false);
                newCircle.push(playerValue === 0);

                if (playerValue === 0) {
                    newPlayer = 1;
                } else {
                    newPlayer = 0;
                }

            } else {
                newFree.push(freeValues[y]);
                newCircle.push(circleValues[y]);
            }

        }

        this.setState({isFree: newFree, isCircle: newCircle, player: newPlayer});
    }

    createTiles() {

        const tiles = [];

        for (let y = 0; y < 9; y++) {

            tiles.push(
                <Tile
                    isFree={this.state.isFree[y]}
                    isCircle={this.state.isCircle[y]}
                    onClick={() => {
                                 this.updateTileValue(y, false);

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
