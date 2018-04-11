import * as React from 'react';
import { XSymbol } from  '../Symbol/XSymbol';
import { OSymbol } from '../Symbol/OSymbol';
import 'material-design-icons/iconfont/material-icons.css';
import { TileValue } from '../../Enums/TileValue';

interface TileProps {

    tileValue: TileValue;
    blocked: boolean;
    onClick: () => void;

}

interface TileState {
}

class Tile extends React.Component<TileProps, TileState> {

    constructor(props: TileProps) {
        super(props);

    }

    getTileValue() {

        if (this.props.tileValue !== TileValue.Empty) {

           if (this.props.tileValue === TileValue.Circle) {

               return(<OSymbol/>);
           } else {

               return(<XSymbol/>);
           }

        } else {
            return '';
        }

    }

    render() {

        const {tileValue, blocked, onClick} = this.props;

        let tileState = TileValue.Empty ? 'empty' : (tileValue === TileValue.Circle ? 'circle' : 'cross');

        return (
            <div
                className={`tile tile-${tileState}`}
                onClick={() => {
                    if (tileValue === TileValue.Empty && !blocked) {
                        onClick();
                    }
                }}
            >
                {this.getTileValue()}
            </div>
        );
    }
}

export default Tile;
