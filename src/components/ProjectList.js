import React, { Component } from 'react';
import ProjectItemContainer from './ProjectItemContainer';

import axios from 'axios';

class ProjectList extends Component {
  constructor() {
        super();
        this.state = {
            projects: null,
        }
  }

  componentDidMount() {
      const _this = this;
      axios.get('projects.json')
        .then(response => {
            _this.setState({ projects: response.data.projects })
        },
        error => {
            console.log(error);
        })
  }

  render() {
    return <div>{ this.state.projects && this.renderProjects() }</div>;
  }

  renderProjects() {
      return this.state.projects.map(project => {
          return <ProjectItemContainer key={ project.id } project={ project }/>
      })
  }
}

export default ProjectList;
