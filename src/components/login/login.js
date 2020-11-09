import React from 'react';
import './login.css';

class Login extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    onSubmit() {
        
    }

    render() {
        return (
            <div className="login">
                <form onSubmit={this.onSubmit()} className="loginForm">
                    <div className="form-group">
                        <label htmlFor="">Username</label>
                        <input type="text"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Password</label>
                        <input type="password"/>
                    </div>
                    <div className="submitDiv">
                        <input className="submitBtn" type="submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;