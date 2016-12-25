import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class ChooseKey extends Component {
    render() {
        const key = localStorage.getItem('api_key') || '';
        return (
            <TextField
                onChange={ this.props.onChange }
                underlineShow={ false }
                defaultValue={ key }
                hintText="Your API Key"
                hintStyle={{ marginBottom: '9px' }}
                style={{ padding: '10px 20px', width: '100%' }}/>
        );
    }
}

export default ChooseKey;
