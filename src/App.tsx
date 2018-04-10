import * as React from 'react';
import './App.css';
import Board from './Components/Board/Board';

const logo = require('./logo.svg');

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to my first - well... something</h1>
                </header>

                    <p className="App-intro">You can roast me for my code if you want but <code>I would cry.</code></p>

                    <div className={'board-center-div'}>
                        <Board />
                    </div>
            </div>
        );
    }
}

export default App;
