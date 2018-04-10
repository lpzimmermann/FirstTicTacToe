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
        const inits2 = [];
        
        for (let y = 0; y < 9; y++) {
            inits.push(true);
            inits2.push(false);
        }

        this.state = {isFree: inits, isCircle: inits2, player: 0};

        this.createTiles();
    }

    updateTileValue(position: number) {
        const {isFree: freeValues, isCircle: circleValues, player: playerValue} = this.state;

        freeValues[position] = false;
        circleValues[position] = (playerValue !== 0);

        this.setState({isFree: freeValues, isCircle: circleValues, player: (playerValue === 0 ? 1 : 0)});
    }

    createTiles() {

        const tiles = [];

        for (let y = 0; y < 9; y++) {

            tiles.push(
                <Tile
                    isFree={this.state.isFree[y]}
                    isCircle={this.state.isCircle[y]}
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
