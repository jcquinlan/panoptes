import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import axios from 'axios';

import ChooseKey from './ChooseKey';
import ChooseCompany from './ChooseCompany';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

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
            <div>
                <Paper zDepth={ 2 }>
                    <ChooseKey onChange={ this.handleKeyChange.bind(this) }/>
                    <Divider />
                    <ChooseCompany onChange={ this.handleCompanyChange.bind(this) }/>
                </Paper>
                <RaisedButton label="Save" onClick={ this.handleCompanyKeySubmit.bind(this) } primary={ true } style={{ marginTop: '20px' }}/>
            </div>
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
        const key = this.state.key;
        const company = this.state.company;

        if(key && company){
            localStorage.setItem('api_key', this.state.key);
            localStorage.setItem('company', this.state.company);

            console.log(key);

            axios.defaults.baseURL = `http://${ company }.teamwork.com`;
            axios.defaults.headers.common['Authorization'] = `Basic ${ atob(key) }:anything`;

            browserHistory.push('/');
        }
        
    }
}

export default CompanyKeyContainer;
