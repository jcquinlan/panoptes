import React, { Component } from 'react';
import ChooseKey from './ChooseKey';
import ChooseCompany from './ChooseCompany';

class CompanyKeyContainer extends Component {
    constructor(){
        super();
        this.state = {
            company: '',
            key: '',
        }
    }

    render() {
        return (
            <form onSubmit={ this.handleCompanyKeySubmit.bind(this) }>
                <ChooseKey onChange={ this.handleKeyChange.bind(this) }/>
                <ChooseCompany onChange={ this.handleCompanyChange.bind(this) }/>
                <input type="submit"/>
            </form>
        );
    }

    handleCompanyChange(event) {
        this.setState({ company: event.target.value });
    }

    handleKeyChange(event) {
        this.setState({ key: event.target.value });
    }

    handleCompanyKeySubmit(event) {
        event.preventDefault();
    }
}

export default CompanyKeyContainer;
