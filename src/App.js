import logo from './logo.svg';
import './App.css';
import Background from "./components/background/background";
import React from "react";
import Container from "./components/container/container";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.pageHandler = this.pageHandler.bind(this);
        this.state = {pageNumber: 1};
    }

    // Handler to update page number and essentially the content shown
    pageHandler(page) {
        this.setState({pageNumber: page}, () => {
            // console.log("Click: " + this.state.pageNumber);
        });
    }

    render() {
        return (
            <div className="App">
                <Background />
                <Container pageNum={this.state.pageNumber} />
            </div>
        );
    }
}

export default App;
