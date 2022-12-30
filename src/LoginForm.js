import React from 'react';

import { firebase } from './FirebaseModule';

import './LoginForm.css';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            email: '',
            password: '',
            isLoggedIn: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        this.setState({
            error: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    }

    setError(newError) {
        this.setState({error: newError, email: this.state.email, password: this.state.password, isLoggedIn: this.state.isLoggedIn});
    }

    setEmail(newEmail) {
        this.setState({error: this.state.error, email: newEmail, password: this.state.password, isLoggedIn: this.state.isLoggedIn});
    }

    setPassword(newPassword) {
        this.setState({error: this.state.error, email: this.state.email, password: newPassword, isLoggedIn: this.state.isLoggedIn});
    }

    setLoggedIn(newLoggedIn) {
        this.setState({error: this.state.error, email: this.state.email, password: this.state.password, isLoggedIn: newLoggedIn});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setError('');

        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((response) => {
                console.log('Successfully logged in!');

                // TODO: Redirect the user to the Reddit home page
            })
            .catch((e) => {
                console.error(e);
                if(e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
                    this.setError('There is no account with the given credentials')
                } else if(e.code === 'auth/invalid-email') {
                    this.setError('Please enter a valid email address');
                } else {
                    this.setError(e.message);
                }
            });
    }

    render() {
        if(this.state.isLoggedIn) {
            return (
                <p>You are logged in</p>
            )
        }

        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={this.state.email} onChange={(e) => this.setEmail(e.target.value)}/>
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={this.state.password} onChange={(e) => this.setPassword(e.target.value)}/>
                    <br />
                    <button type="submit">Log In</button>
                    {this.state.error && <p className="error-msg">{this.state.error}</p>}
                </form>
            </div>
        )
    }
}