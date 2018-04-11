import * as React from 'react';
import Board from './Board';

interface ContainerProps {

}

interface ContainerState {

}

class Container extends React.Component<ContainerProps, ContainerState> {

    createBoards() {

        const boards = [];

        for (let y = 0; y < 9; y++) {

            boards.push(
                <Board/>
            );
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