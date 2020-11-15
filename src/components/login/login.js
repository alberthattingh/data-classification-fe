import React from 'react';
import './login.css';

class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }

        this.onUserChange = this.onUserChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onUserChange(event) {
        this.setState({username: event.target.value}, () => {
            // console.log(this.state.username);
        });
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value}, () => {
            // console.log(this.state.password);
        });
    }
    
    onSubmit(event) {
        event.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"username":this.state.username, "password":this.state.password});

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://dcs-backend.herokuapp.com/users/login", requestOptions)
            .then(response => {
                if (response.status === 200) {
                    return response.text();

                }
                else {
                    alert("Invalid login details");
                    return null;
                }
            })
            .then(result => {
                if (result != null) {
                    this.props.pageHandler(2, JSON.parse(result));
                }
                else {
                    console.log("RESULT IS NULL");
                }
            })
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <div className="outer">
                <h1>Login</h1>
                <div className="login">
                    <form onSubmit={this.onSubmit} className="loginForm">
                        <div className="form-group">
                            <label htmlFor="">Username</label>
                            <input type="text" onChange={this.onUserChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Password</label>
                            <input type="password" onChange={this.onPasswordChange}/>
                        </div>
                        <div className="submitDiv">
                            <input className="submitBtn" type="submit"/>
                        </div>
                        <div className="form-group new-acc">
                            <a href="./register.html">I don't have an account</a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;