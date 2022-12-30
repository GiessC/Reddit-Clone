import React from 'react';

export default class LoginButton extends React.Component {
    render() {
        return (
            <button onClick={this.props.handleClick}>Login</button>
        );
    }
}