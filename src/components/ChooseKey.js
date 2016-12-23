import React, { Component } from 'react';
import { browserHistory } from 'react-router'

class ChooseKey extends Component {
    constructor(){
        super();
        this.state = {
            key: '',
        }
    }

    render() {
        return (
            <form onSubmit={ this.handleKeySubmit.bind(this) }>
                <input type="text" onChange={ this.handleKeyChange.bind(this) } />
                <input type="submit"/>
            </form>
        );
    }

    handleKeyChange(event) {
        this.setState({ key: event.target.value });
    }

    handleKeySubmit(event) {
        event.preventDefault();
        localStorage.setItem('api_key', this.state.key)
        browserHistory.push('/');
    }
}

export default ChooseKey;
