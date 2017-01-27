import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';

const CustomAppBar = (props) => {
    return (
        <AppBar
            title={ "panoptes" + (props.user ? ' - ' + props.user['company-name'] : '') }
            style={{ position: 'fixed', top: '0', backgroundColor: '#13C15B' }}
            zDepth={ 2 }
            titleStyle={{ fontWeight: '100', textAlign: 'center' }}
            showMenuIconButton={ props.isLoggedIn }
            onLeftIconButtonTouchTap={ props.toggleSlideout }
          />
    )
}

export default CustomAppBar;
