import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const CustomLoadingSpinner = (props) => {
    // If the user doesn't provide a width, assign a default of 80
    const width = props.width || 80;

    const styles = () => {
      return {
          position: 'relative',
          marginLeft: '50%',
          transform: `translateX(-${ width / 2 }px)`,
      }
  }

    return (
        <CircularProgress style={ styles() } size={ width } thickness={5} color={ '#13C15B'}/>
    )
}

export default CustomLoadingSpinner;
