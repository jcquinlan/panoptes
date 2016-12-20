import React, { Component } from 'react';
import './App.scss';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
injectTapEventPlugin();

import axios from 'axios';
import info from './keys.js';

import ProjectList from './components/ProjectList';

axios.defaults.baseURL = `http://${ info.company }.teamwork.com`;
axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(`${ info.API }:anything`);
axios.defaults.headers.common['Accept'] = `application/json; charset=utf-8`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      slideoutOpen: false,
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
          </Drawer>

          <div className="wrapper">
            <div className="container">
              <ProjectList></ProjectList>
            </div>
          </div>
        </div>
        </MuiThemeProvider>
    );
  }

  toggleSlideout(){
    this.setState({ slideoutOpen: !this.state.slideoutOpen })
  }
}

export default App;
