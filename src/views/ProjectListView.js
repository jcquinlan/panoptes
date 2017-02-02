import React, { Component } from 'react';
import ProjectList from '../components/ProjectList';
import ProjectToolbar from '../components/ProjectToolbar';
import ViewTitle from '../components/ViewTitle';

import axios from 'axios';

class ProjectListView extends Component {
    constructor(){
        super();
        this.state = {
            error: '',
            filterValue: '',
            projects: [],
        }

        this.setFilterValue = this.setFilterValue.bind(this);
    }

    componentDidMount() {
      const _this = this;
      axios.get('projects.json')
        .then(response => {
            _this.setState({ projects: response.data.projects.filter(project => true ) })
        },
        error => {
            console.log(error);
        })
  }

    render() {
        return (
            <div>
                <ViewTitle>Projects</ViewTitle>
                <ProjectToolbar handleValueChange={ this.setFilterValue } numberOfProjects={ this.state.projects.length }/>
                <ProjectList projects={ this.state.projects } filterValue={ this.state.filterValue }/>
            </div>
        );
    }

    setError(error){
        this.setState({ error });
    }

    setFilterValue(event){
        this.setState({ filterValue: event.target.value });
    }


}

export default ProjectListView;
