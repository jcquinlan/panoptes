import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';

const LogoutButton = (props) => {
    return <MenuItem onTouchTap={ props.logoutHandler }>{ props.text }</MenuItem>
}

LogoutButton.propTypes = {
    logoutHandler: React.PropTypes.func.isRequired,
    text: React.PropTypes.string.isRequired,
}

export default LogoutButton;