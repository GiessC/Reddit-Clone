import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import React from 'react';

import './SignupForm.css';

export default class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setError = this.setError.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            error: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    setEmail(newEmail) {
        this.setState({error: this.state.error, email: newEmail, password: this.state.password, confirmPassword: this.state.confirmPassword});
    }

    setPassword(newPassword) {
        this.setState({error: this.state.error, email: this.state.email, password: newPassword, confirmPassword: this.state.confirmPassword});
    }

    setConfirmPassword(newConfirmPassword) {
        this.setState({error: this.state.error, email: this.state.email, password: this.state.password, confirmPassword: newConfirmPassword});
    }

    setError(newError) {
        this.setState({error: newError, email: this.state.email, password: this.state.password, confirmPassword: this.state.confirmPassword});
    }

    componentDidMount() {
        this.setState({
            error: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

        const config = {
            apiKey: 'AIzaSyCs2KqYUTgRqwdrbSh-Hq5K6uKHzIsyaHk',
            authDomain: 'chatgpt-6317c.firebaseapp.com',
            databaseURL: 'https://chatgpt-6317c.nam5.firebasedatabase.app',
            projectId: 'chatgpt-6317c',
            storageBucket: 'chatgpt-6317c.appspot.com',
            messagingSenderId: '1087048171745',
            appId: '1:1087048171745:web:fdae8ede5cd0ddbf9077a0'
        };
        firebase.initializeApp(config);
    }

    handleSubmit(e) {
        e.preventDefault();

        let error = '';
        if(this.state.password !== this.state.confirmPassword) {
            error = 'Passwords do not match';
        } else if(this.state.password.length < 8) {
            error = 'Password must be at least 8 characters long';
        } else if(!/[A-Z]/.test(this.state.password)) {
            error = 'Password must contain at least one uppercase letter';
        } else if(!/[a-z]/.test(this.state.password)) {
            error = 'Password must contain at least one lowercase letter';
        } else if(!/[!@#$%^&*]/.test(this.state.password)) {
            error = 'Password must contain at least one special character';
        } else if(!/[0-9]/.test(this.state.password)) {
            error = 'Password must contain at least one number';
        }

        this.setError(error);
        if(!error) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then((response) => {
                    // User created successfully
                    console.log("User created successfully " + response);
                })
                .catch((error) => {
                    // Handle error
                    console.log(error);
                    if (error.code === 'auth/email-already-in-use') {
                        this.setError('The given email address is already in use');
                    } else {
                        this.setError(error.message);
                    }
                })
        }
    }

    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={this.state.email} onChange={(e) => this.setEmail(e.target.value)}/>
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={this.state.password} onChange={(e) => this.setPassword(e.target.value)}/>
                    <br />
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input type="password" id="confirm-password" value={this.state.confirmPassword} onChange={(e) => this.setConfirmPassword(e.target.value)}/>
                    <br />
                    <button type="submit">Sign Up</button>
                    {this.state.error && <p className="error-msg">{this.state.error}</p>}
                </form>
            </div>
        )
    }
}