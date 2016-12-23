import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'
import './App.scss';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
injectTapEventPlugin();

import axios from 'axios';
import info from './keys.js';
import { hasKeyGuard } from './guards/hasKeyGuard';

import ProjectList from './components/ProjectList';
import CompanyKeyContainer from './components/CompanyKeyContainer';

axios.defaults.baseURL = `http://${ info.company }.teamwork.com`;
axios.defaults.headers.common['Accept'] = `application/json; charset=utf-8`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      slideoutOpen: false,
      company: '',
    }
  }

  render() {
    return (
        <MuiThemeProvider>
        <div>
          <AppBar
            title="panoptes"
            zDepth={ 2 }
            onLeftIconButtonTouchTap={ this.toggleSlideout.bind(this) }
          />

          <Drawer
            docked={false}
            width={400}
            open={this.state.slideoutOpen}
            onRequestChange={ this.toggleSlideout.bind(this) }
          >
            <MenuItem onTouchTap={ this.toggleSlideout.bind(this) }>Menu Item</MenuItem>
            <MenuItem onTouchTap={ this.toggleSlideout.bind(this) }>Menu Item 2</MenuItem>
            <MenuItem onTouchTap={ this.removeApiKey.bind(this) }>Remove Api Key</MenuItem>
          </Drawer>

          <div className="wrapper">
            <div className="container">
                <Router history={ browserHistory }>
                  <Route path="/" component={ ProjectList } onEnter={ hasKeyGuard }></Route>
                  <Route path="/key" component={ CompanyKeyContainer }></Route>
                </Router>
            </div>
          </div>
        </div>
        </MuiThemeProvider>
    );
  }

  componentDidMount() {

  }

  toggleSlideout(){
    this.setState({ slideoutOpen: !this.state.slideoutOpen })
  }

  removeApiKey(){
      localStorage.removeItem('api_key');
      this.toggleSlideout();
      browserHistory.push('/key');
  }
}

export default App;
