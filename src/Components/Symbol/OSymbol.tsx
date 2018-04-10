import * as React from 'react';
import './symbols.css';

interface OSymbolProps {

}

interface OSymbolState {
}

export class OSymbol extends React.Component<OSymbolProps, OSymbolState> {

    constructor( props: OSymbolProps ) {
        super( props );
    }

    render() {

        return (
            <i className={'material-icons o animate-o'} >panorama_fish_eye</i>
        );
    }
}