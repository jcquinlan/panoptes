import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import axios from 'axios';

import ChooseKey from './ChooseKey';
import ChooseCompany from './ChooseCompany';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class CompanyKeyContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            company: '',
            key: '',
        }

        this.handleKeyChange = this.handleKeyChange.bind(this);
        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handleCompanyKeySubmit = this.handleCompanyKeySubmit.bind(this);
    }

    styles(){
        return {
            marginTop: '20px',
        }
    }

    render() {
        return (
            <div>
                <Paper zDepth={ 1 }>
                    <ChooseKey onChange={ this.handleKeyChange }/>
                    <Divider />
                    <ChooseCompany onChange={ this.handleCompanyChange }/>
                </Paper>
                <RaisedButton label="Save" 
                    onClick={ this.handleCompanyKeySubmit }
                    backgroundColor='#13C15B'
                    labelColor='#fff'
                    style={ this.styles() }/>
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
            axios.defaults.baseURL = `http://${ company }.teamwork.com`;
            axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(key + ':anything');

            axios.get('/me.json').then(response => {
                // If it all goes smoothly, save locally, update User and Logged In, and route to projects.
                if(response.status === 200){
                    localStorage.setItem('api_key', this.state.key);
                    localStorage.setItem('company', this.state.company);
                    localStorage.setItem('user', JSON.stringify(response.data.person));
                    this.props.setUser(response.data.person);
                    this.props.setIsLoggedIn(true);

                    browserHistory.push('/');
                }
            },
            error => {
                this.props.setError('Provided information is incorrect.');
            })
        }
     
    }
}

export default CompanyKeyContainer;
