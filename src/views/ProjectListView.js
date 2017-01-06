import React, { Component } from 'react';
import ProjectList from '../components/ProjectList';
import ViewTitle from '../components/ViewTitle';

class ProjectListView extends Component {
    constructor(){
        super();
        this.state = {
            error: '',
        }
    }

    render() {
        return (
            <div>
                <ViewTitle>Projects</ViewTitle>
                <ProjectList />
            </div>
        );
    }

    setError(error){
        this.setState({ error });
    }


}

export default ProjectListView;
