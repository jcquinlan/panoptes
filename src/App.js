import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './App.scss';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';

import CustomAppBarContainer from './containers/CustomAppBarContainer';
import LogoutButtonContainer from './containers/LogoutButtonContainer';

import { LOGIN, LOGOUT, SET_USER } from './constants/actions';
injectTapEventPlugin();

import axios from 'axios';

axios.defaults.headers.common['Accept'] = `application/json; charset=utf-8`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      slideoutOpen: false,
      isLoggedIn: this.hasCompanyKey(),
      user: null,
    }

    this.navigateTo = this.navigateTo.bind(this);
    this.toggleSlideout = this.toggleSlideout.bind(this);
    this.toggleSlideout = this.toggleSlideout.bind(this);
    this.logout = this.logout.bind(this);
  }

  render() {
    return (
        <MuiThemeProvider>
        <div>
          <CustomAppBarContainer toggleSlideout={ this.toggleSlideout }/>

          { this.hasCompanyKey() && 
              <Drawer
                docked={ false }
                width={  400 }
                open={ this.state.slideoutOpen }
                onRequestChange={ this.toggleSlideout }>

                  <MenuItem onTouchTap={ () => this.navigateTo('') }>Projects</MenuItem>
                  <MenuItem onTouchTap={ () => this.navigateTo('people') }>People</MenuItem>
                  <Divider/>
                  <MenuItem onTouchTap={ () => this.navigateTo('key') }>Configure Keys</MenuItem>
                  <LogoutButtonContainer text={ 'Logout' } toggleSlideout={ this.toggleSlideout }/>
              </Drawer>
          }

            <div className="wrap container-fluid">
                { this.props.children }
            </div>
        </div>
        </MuiThemeProvider>
    );
  }

  componentDidMount(){
    this.getUserInfo();
  }

  getUserInfo(){
    const user = localStorage.getItem('user');
    const api_key = localStorage.getItem('api_key');
    const company = localStorage.getItem('company');

    if(user && !this.state.user){
      this.setState({ user: JSON.parse(user) });
    } else if(api_key && company){
      axios.get('/me.json').then(response => {
        localStorage.setItem('user', response.data.person);
        this.setState({ user: response.data.person });
      })
    }
  }

  toggleSlideout(){
    this.setState({ slideoutOpen: !this.state.slideoutOpen })
  }

  // This method is passed down into the CompanyKeyContainer Component to inform the App that the user has successfully
  // logged in once they add their key and company name.
  setLoggedIn(isLoggedIn){
    this.setState({ loggedIn: isLoggedIn });
  }

  setUser(user){
    this.setState({ user: JSON.parse(user) });
    localStorage.setItem('user', user);
  }

  navigateTo(location){
    this.toggleSlideout();
    browserHistory.push(`/${ location }`);
  }

  hasCompanyKey(){
    const api_key = localStorage.getItem('api_key');
    const company = localStorage.getItem('company');
    return !!(api_key && company);
  }

 logout(){
      localStorage.removeItem('api_key');
      localStorage.removeItem('company');
      localStorage.removeItem('user');
      this.setState({ user: null });
      this.toggleSlideout();
      browserHistory.push('/key');
  }
}

export default App;
