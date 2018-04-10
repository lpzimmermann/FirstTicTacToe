import * as React from 'react';
import './symbols.css';

interface XSymbolProps {

}

interface XSymbolState {
}

export class XSymbol extends React.Component<XSymbolProps, XSymbolState> {

    constructor( props: XSymbolProps ) {
        super( props );
    }

    render() {

        return (
            <i className={'material-icons x animate-x'} >clear</i>
        );
    }
}