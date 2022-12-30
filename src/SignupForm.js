import { firebase, db } from './FirebaseModule';

import React from 'react';

import './SignupForm.css';

export default class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        };

        this.setError = this.setError.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setEmail(newEmail) {
        this.setState({error: this.state.error, email: newEmail, username: this.state.username, password: this.state.password, confirmPassword: this.state.confirmPassword});
    }

    setUsername(newUsername) {
        this.setState({error: this.state.error, email: this.state.email, username: newUsername, password: this.state.password, confirmPassword: this.state.confirmPassword});
    }

    setPassword(newPassword) {
        this.setState({error: this.state.error, email: this.state.email, username: this.state.username, password: newPassword, confirmPassword: this.state.confirmPassword});
    }

    setConfirmPassword(newConfirmPassword) {
        this.setState({error: this.state.error, email: this.state.email, username: this.state.username, password: this.state.password, confirmPassword: newConfirmPassword});
    }

    setError(newError) {
        this.setState({error: newError, email: this.state.email, username: this.state.username, password: this.state.password, confirmPassword: this.state.confirmPassword});
    }

    componentDidMount() {
        this.setState({
            error: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setError('');

        db.collection('users').where('username', '==', this.state.username).get().then((querySnapshot) => {
            if(!querySnapshot.empty) {
                this.setError('The specified username is already in use');
            } else if(!this.state.username) {
                this.setError('Please specify a username');
            } else if(this.state.password !== this.state.confirmPassword) {
                this.setError('Passwords do not match');
            } else if(this.state.password.length < 8) {
                this.setError('Password must be at least 8 characters long');
            } else if(!/[A-Z]/.test(this.state.password)) {
                this.setError('Password must contain at least one uppercase letter');
            } else if(!/[a-z]/.test(this.state.password)) {
                this.setError('Password must contain at least one lowercase letter');
            } else if(!/[!@#$%^&*]/.test(this.state.password)) {
                this.setError('Password must contain at least one special character');
            } else if(!/[0-9]/.test(this.state.password)) {
                this.setError('Password must contain at least one number');
            } else {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then((response) => {
                        // User created successfully
                        console.log("User created successfully");

                        db.collection('users').add({
                            username: this.state.username,
                            email: this.state.email,
                            posts: [],
                            communities: []
                        }).then(r => {
                            console.log(r);
                        });

                        // TODO: Print a success message with a link to the Login page
                    })
                    .catch((error) => {
                        // Handle error
                        console.error(error);
                        if (error.code === 'auth/email-already-in-use') {
                            this.setError('The given email address is already in use');
                        } else if(error.code === 'auth/invalid-email') {
                            this.setError('Please enter a valid email address')
                        } else {
                            this.setError(error.message);
                        }
                    });
            }
        });
    }

    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={this.state.email} onChange={(e) => this.setEmail(e.target.value)}/>
                    <br />
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={this.state.username} onChange={(e) => this.setUsername(e.target.value)}/>
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