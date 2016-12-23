import React, { Component } from 'react';

class ChooseKey extends Component {
    render() {
        return (
            <div>
                <label htmlFor="key">Key</label>
                <input type="text" id="key" onChange={ this.props.onChange } />
            </div>
        );
    }
}

export default ChooseKey;
