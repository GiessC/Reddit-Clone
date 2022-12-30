import React from 'react';

import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to the home page!</h1>
                <LoginButton handleClick={this.props.handleLoginClick}/>
                <SignupButton handleClick={this.props.handleSignupClick} />
            </div>
        );
    }
}