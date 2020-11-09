import React from "react";
import './container.css';
import Login from '../login/login'

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: props.pageNum,
            pageHandler: props.pageHandler,
            data: null
        };
        // console.log("State updated!");
    }

    contentSelector() {
        console.log(this.state.pageNumber + " - " + this.props.pageNum);
        if (this.props.pageNum === 1) {
            return Login;
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
                        <Login />
                    </div>
                </div>
            </div>
        );
    }
}
export default Container;