import React from 'react';
import './main.css';
import Loader from "../loader/loader";

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.fileInput = React.createRef();
        this.state = {
            loading: false
        }
    }

    validFileType(file) {
        if (file == null) {
            return false;
        }
        return file.name.endsWith(".xlsx") || file.name.endsWith(".txt") || file.name.endsWith(".csv");
    }

    onFormSubmit(event) {
        event.preventDefault();
        const file = this.fileInput.current.files[0];

        if (!this.validFileType(file)) {
            alert("The file type is not supported. Try uploading an Excel, text, or CSV file.");
            return;
        }

        this.setState({loading: true}, () => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + this.props.token);

            var formdata = new FormData();
            formdata.append("dataFile", file, file.name);

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
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
                        this.props.pageHandler(4, {access_token: this.props.token}, JSON.parse(result));
                    }
                    else {
                        console.log("RESULT IS NULL");
                    }
                    // console.log(result)
                })
                .catch(error => console.log('error', error));
        });
    }

    render() {
        if (this.state.loading) {
            return (
                <Loader />
            );
        }
        else {
            return (
                <div id="outer">
                    <h1>ClassifyThis</h1>
                    <form onSubmit={this.onFormSubmit} id="upload">
                        <div className="group">
                            <label className="main" htmlFor="">Upload a file to classify</label>
                            <input className="uploadButton" type="file" ref={this.fileInput} />
                        </div>
                        <div className="info">
                            As of date the following file types are supported:
                            <ul>
                                <li>CSV files</li>
                                <li>Text files (with fields separated by pipes)</li>
                                <li>Excel files (.xlsx only)</li>
                            </ul>
                        </div>
                        <div className="submitDiv">
                            <input className="submitBtn" type="submit" />
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default Main;