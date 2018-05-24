import * as React from 'react';
import { Player } from '../../Enums/Player';
import { XSymbol } from '../Symbol/XSymbol';
import UltimateBoard from '../Board/UltimateBoard';
import { OSymbol } from '../Symbol/OSymbol';

interface ContainerProps {

}

interface ContainerState {

    currentPlayer: Player;
    finished: boolean;
}

class Container extends React.Component<ContainerProps, ContainerState> {

    constructor( props: ContainerProps ) {
        super(props);
        this.state = {currentPlayer: Player.Cross, finished: false};
    }

    updateCurrentPlayer() {
        this.setState({currentPlayer: (this.state.currentPlayer === Player.Cross ? Player.Circle : Player.Cross),
            finished: this.state.finished});
    }

    getCurrentPlayer() {
        return this.state.currentPlayer;
    }

    updateFinishedValue(isFinished: boolean) {
        this.setState({currentPlayer: this.state.currentPlayer , finished: isFinished});
    }
    getFinishedValue() {
        return this.state.finished;
    }

    render() {

       return (
           <div className={'game-container'}>

               {this.state.finished ? 'Der Gewinner ist ' : ''}
               {this.state.currentPlayer === Player.Cross ? <XSymbol /> : <OSymbol/>}
               <UltimateBoard
                   updateCurrentPlayer={() => this.updateCurrentPlayer()}
                   getCurrentPlayer={() => this.getCurrentPlayer()}
                   updateFinishedValue={(fw) => this.updateFinishedValue(fw)}
                   getFinishedValue={() => this.getFinishedValue()}
               />
           </div>
       );

    }

}

export default Container;