import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';

const LogoutButton = (props) => {
    const customLogoutHandler = () => {
        // Combine the Redux Container prop, and a prop from App component to close the slideout nav when logging out.
        props.toggleSlideout();
        props.logoutHandler();
    }
    return <MenuItem onTouchTap={ customLogoutHandler }>{ props.text }</MenuItem>
}

LogoutButton.propTypes = {
    logoutHandler: React.PropTypes.func.isRequired,
    text: React.PropTypes.string.isRequired,
}

export default LogoutButton;