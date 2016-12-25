import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class ChooseKey extends Component {
    render() {
        const company = localStorage.getItem('company') || '';
        return (
            <TextField
                onChange={ this.props.onChange }
                underlineShow={ false }
                defaultValue={ company }
                hintText="Your Company"
                hintStyle={{ marginBottom: '9px' }}
                style={{ padding: '10px 20px', width: '100%' }}/>
        );
    }
}

export default ChooseKey;
