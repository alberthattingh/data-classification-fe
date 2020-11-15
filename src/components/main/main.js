import React from 'react';
import './main.css';
import '../../loader.css';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    onFormSubmit(event) {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + this.props.token);

        var formdata = new FormData();
        formdata.append("dataFile", this.fileInput.current.files[0], this.fileInput.current.files[0].name);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://dcs-backend.herokuapp.com/classify", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    render() {
        return (
        <div id="outer">
            <h1>ClassifyThis</h1>
            <form onSubmit={this.onFormSubmit} id="upload">
                <div className="group">
                    <label className="main" htmlFor="">Upload a file to classify</label>
                    <input className="uploadButton" type="file" ref={this.fileInput} />
                </div>
                <div id="loader"></div>
                <div className="submitDiv">
                    <input className="submitBtn" type="submit" />
                </div>
            </form>
        </div>
        );
    }
}

export default Main;