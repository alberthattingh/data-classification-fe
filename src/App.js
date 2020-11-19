import logo from './logo.svg';
import './App.css';
import Background from "./components/background/background";
import React from "react";
import Container from "./components/container/container";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="App">
                <Background />
                <Container />
            </div>
        );
    }
}

export default App;
