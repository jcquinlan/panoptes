import React, { Component } from 'react';
import { connect } from 'react-redux';
import CompanyKeyContainer from '../components/CompanyKeyContainer';
import LoginContainer from '../containers/LoginContainer';
import { LOGIN, SET_USER } from '../constants/actions';

class LoginView extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: '',
        }
    }

    render() {
        return (
            <div>
                <h2 style={{ display: 'inline-block' }}>Please add your API Key and Company name.</h2>
                { this.state.error && <p>{ this.state.error }</p> }
                <LoginContainer
                    setError={ this.setError.bind(this) }/>
            </div>
        );
    }

    setError(error){
        this.setState({ error });
    }

    setLoggedIn(isLoggedIn){
        this.props.dispatch({ type: LOGIN, isLoggedIn });
    }

    setUser(user){
        this.props.dispatch({ type: SET_USER, user });
    }
}

LoginView = connect()(LoginView)                    

export default LoginView;
