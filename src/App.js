import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'
import './App.scss';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
injectTapEventPlugin();

import axios from 'axios';
import { hasKeyGuard } from './guards/hasKeyGuard';

import ProjectListView from './views/ProjectListView';
import PeopleListView from './views/PeopleListView';
import AddCompanyKey from './views/AddCompanyKey';

axios.defaults.headers.common['Accept'] = `application/json; charset=utf-8`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      slideoutOpen: false,
      isLoggedIn: this.hasCompanyKey(),
      user: null,
    }

    this.navigateTo.bind(this);
  }

  render() {
    return (
        <MuiThemeProvider>
        <div>
          <AppBar
            title={ "panoptes" + (this.state.user ? ' - ' + this.state.user['company-name'] : '') }
            style={{ position: 'fixed', top: '0', backgroundColor: '#13C15B' }}
            zDepth={ 2 }
            titleStyle={{ fontWeight: '100', textAlign: 'center' }}
            showMenuIconButton={ this.hasCompanyKey() }
            onLeftIconButtonTouchTap={ this.toggleSlideout.bind(this) }
          />

          { this.hasCompanyKey() && 
              <Drawer
                docked={ false }
                width={  400 }
                open={ this.state.slideoutOpen }
                onRequestChange={ this.toggleSlideout.bind(this) }>

                  <MenuItem onTouchTap={ () => this.navigateTo('') }>Projects</MenuItem>
                  <MenuItem onTouchTap={ () => this.navigateTo('people') }>People</MenuItem>
                  <Divider/>
                  <MenuItem onTouchTap={ () => this.navigateTo('key') }>Configure Keys</MenuItem>
                  <MenuItem onTouchTap={ this.logout.bind(this) }>Logout</MenuItem>
              </Drawer>
          }

            <div className="wrap container-fluid">
                <Router history={ browserHistory }>
                  { this.routes() }
                </Router>
            </div>
        </div>
        </MuiThemeProvider>
    );
  }

  componentDidMount(){
    this.getUserInfo();
  }

  routes(){
    return (
      <Route>
        <Route path="/" component={ ProjectListView } onEnter={ hasKeyGuard }></Route>
        <Route path="/key" 
            component={ AddCompanyKey } 
            setLoggedIn={ this.setLoggedIn.bind(this) }
            setUser={ this.setUser.bind(this) }></Route>
        <Route path="/people" component={ PeopleListView } onEnter={ hasKeyGuard }></Route>
      </Route>
    )
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
