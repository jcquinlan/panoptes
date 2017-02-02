import React, { Component } from 'react';
import ProjectItemContainer from './ProjectItemContainer';
import CustomLoadingSpinner from './CustomLoadingSpinner';

import axios from 'axios';

const ProjectList = (props) => {

    const renderProjects = () => {
      return props.projects
        .filter(project => {
            const project_name = project.name.toLowerCase();
            return project_name.indexOf(props.filterValue.toLowerCase()) > -1;
        })
        .map(project => {
            return <ProjectItemContainer key={ project.id } project={ project }/>
        })
    }

    return (
        <div>
            { !props.projects &&  <CustomLoadingSpinner/>}
            { props.projects && renderProjects() }
        </div>
    )
}

export default ProjectList;
