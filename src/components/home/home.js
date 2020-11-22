import React from 'react';
import './home.css';
import Loader from "../loader/loader";
import imgClassify from "./icons8-mind-map-48.png";
import imgView from "./icons8-view-64.png";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.btnClassifyClick = this.btnClassifyClick.bind(this);
        this.btnQueryClick = this.btnQueryClick.bind(this);

        this.state = {
            loading: false
        }
    }

    btnClassifyClick() {
        this.props.pageHandler(3, {access_token: this.props.token}, null);
    }

    btnQueryClick() {
        this.setState({loading: true});

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.props.token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://dcs-backend.herokuapp.com/classify", requestOptions)
            .then(response => {
                this.setState({loading: false});

                if (response.status === 200) {
                    return response.text();

                }
                else {
                    alert("Something went wrong");
                    return null;
                }
            })
            .then(result => {
                if (result != null) {
                    this.props.pageHandler(5, {access_token: this.props.token}, JSON.parse(result));
                }
                else {
                    console.log("RESULT IS NULL");
                }
                // console.log(result)
            })
            .catch(error => console.log('error', error));
    }

    render() {
        if (this.state.loading) {
            return (
                <Loader />
            );
        }
        else {
            return (
                <div id="outer-box">
                    <h1>Home</h1>
                    <div className="btnGroup">
                        <div className="btn-container">
                            <div className="button"
                                 onClick={this.btnClassifyClick}>
                                <img src={imgClassify} alt=""/>
                                <h3>Classify</h3>
                            </div>
                        </div>
                        <div className="btn-container">
                            <div className="button"
                                 onClick={this.btnQueryClick}>
                                <img src={imgView} alt=""/>
                                <h3>Query</h3>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Home;