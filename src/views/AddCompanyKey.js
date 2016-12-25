import React, { Component } from 'react';
import CompanyKeyContainer from '../components/CompanyKeyContainer';

class AddCompanyKey extends Component {
    constructor(){
        super();
        this.state = {
            error: '',
        }
    }

    render() {
        return (
            <div>
                <h2 style={{ display: 'inline-block' }}>Please add your API Key and Company name.</h2>
                { this.state.error && <p>{ this.state.error }</p> }
                <CompanyKeyContainer 
                    setLoggedIn={ this.props.route.setLoggedIn } 
                    setUser={ this.props.route.setUser }
                    setError={ this.setError.bind(this) }/>
            </div>
        );
    }

    setError(error){
        this.setState({ error });
    }


}

export default AddCompanyKey;
