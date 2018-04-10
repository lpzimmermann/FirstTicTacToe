import * as React from 'react';
import { XSymbol } from  '../Symbol/XSymbol';
import { OSymbol } from '../Symbol/OSymbol';
import 'material-design-icons/iconfont/material-icons.css';

interface TileProps {

    isCircle: boolean;
    isFree: boolean;
    onClick: () => void;

}

interface TileState {
}

class Tile extends React.Component<TileProps, TileState> {

    constructor(props: TileProps) {
        super(props);

    }

    getTileValue() {

        if (this.props.isFree === false) {

           if (this.props.isCircle === true) {

               return(<OSymbol/>);
           } else {

               return(<XSymbol/>);
           }

        } else {
            return '';
        }

    }

    render() {

        const {isCircle, isFree, onClick} = this.props;

        let tileState = isFree ? 'empty' : (isCircle ? 'circle' : 'cross');

        return (
            <div
                className={`tile tile-${tileState}`}
                onClick={() => {
                    if (isFree) {
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
