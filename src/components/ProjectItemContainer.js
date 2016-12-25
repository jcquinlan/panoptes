import React, { Component } from 'react';
import ProjectItem from './ProjectItem';

import axios from 'axios';

class ProjectItemContainer extends Component {
    constructor() {
        super();
        this.state = {
            times: null,
        }
    }

    componentDidMount() {
        axios.get(`projects/${ this.props.project.id }/time/total.json`)
            .then(response => {
                this.setState({ times: response.data.projects[0] })
            },
            error => {
                console.log(error);
            })
    }

  render() {
    return (
        <div>
            { this.state.times && this.renderProjectItem() }
        </div>

    );
  }

  renderProjectItem() {
        return (
        <div className="row">
            <div className="col-xs-12">
                <ProjectItem 
                    timeTotal={ this.state.times['time-totals']['total-hours-sum'] } 
                    timeEstimates={ this.state.times['time-estimates']['total-hours-estimated'] } 
                    project={ this.props.project }/>
            </div>
        </div>
        )
  }
}

export default ProjectItemContainer;
