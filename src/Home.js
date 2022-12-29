import React from 'react';

import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to the home page!</h1>
                <p>This is where you can put your home page content.</p>
                <LoginButton />
                <SignupButton handleClick={this.props.handleSignupClick} />
            </div>
        );
    }
}