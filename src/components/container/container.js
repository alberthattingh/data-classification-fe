import React from "react";
import './container.css';
import Login from '../login/login'
import Main from "../main/main";

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.pageHandler = this.pageHandler.bind(this);
        this.state = {pageNumber: 1, token: null};
        // console.log("State updated!");
    }

    // Handler to update page number and essentially the content shown
    pageHandler(page, token) {
        this.setState({pageNumber: page, token: token['access_token']}, () => {
            // console.log("Page: " + page + "\nToken: " + token['access_token']);
        });
    }

    contentSelector() {
        // console.log(this.state.pageNumber + " - " + this.props.pageNum);
        if (this.state.pageNumber === 1) {
            return Login;
        }
        else if (this.state.pageNumber === 2) {
            return Main;
        }
        else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        const Content = this.contentSelector();

        return(
            <div className="overlay">
                <div className="container">
                    <div className="content">
                        <Content pageHandler={this.pageHandler} token={this.state.token} />
                    </div>
                </div>
            </div>
        );
    }
}
export default Container;