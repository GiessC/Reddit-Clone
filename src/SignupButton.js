import React from 'react';

export default class SignupButton extends React.Component {

    render() {
        return (
            <button onClick={this.props.handleClick}>Sign Up</button>
        );
    }
}