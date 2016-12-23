import React, { Component } from 'react';

class ChooseKey extends Component {
    render() {
        return (
            <div>
                <label htmlFor="company">Company</label>
                <input type="text" id="company" onChange={ this.props.onChange } />
            </div>
        );
    }
}

export default ChooseKey;
