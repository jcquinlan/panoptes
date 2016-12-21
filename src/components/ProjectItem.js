import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import HorizontalBar from './HorizontalBar';

class ProjectItem extends Component {
  render() {
      const created_on = new Date(this.props.project['created-on']);
      const options = {
          weekday: "long", year: "numeric", month: "short",
          day: "numeric", hour: "2-digit", minute: "2-digit"
      };

    return (
        <Card>
            <HorizontalBar total={ this.props.timeTotal } partial={ this.props.timeEstimates }/>
            <CardTitle title={ this.props.project.name } subtitle={ 'Created: ' + created_on.toLocaleTimeString("en-us", options) } />
            <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
        </Card>

    );
  }
}

export default ProjectItem;
