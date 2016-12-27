import React, { Component } from 'react';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import HorizontalBar from './HorizontalBar';
import PersonTimeTable from './PersonTimeTable';
import axios from 'axios';

class ProjectItem extends Component {
    constructor(){
        super();
        this.state = {
            expanded: false,
            dataLoaded: false,
            timeEntries: null,
            people: null,
        }
    }
  render() {
      const created_on = new Date(this.props.project['created-on']);
      const options = {
          weekday: "long", year: "numeric", month: "short",
          day: "numeric", hour: "2-digit", minute: "2-digit"
      };

    return (
        <Card expanded={ this.state.expanded } 
            onExpandChange={ this.handleExpandChange.bind(this) }
            style={{ transition: '0.3s' }}>
            <HorizontalBar total={ this.props.timeTotal } partial={ this.props.timeEstimates }/>
            <CardHeader
                title={ this.props.project.name }
                titleStyle={{ fontSize: '24px' }}
                subtitle={ 'Created: ' + created_on.toLocaleTimeString("en-us", options) }
                showExpandableButton={ true }
                />
            <CardText expandable={ true }>
                <div className="row">
                    <div className="col-xs-6">
                        { this.state.dataLoaded && <PersonTimeTable people={ this.state.people } timeEntries={ this.state.timeEntries }/> }    
                    </div>

                    <div className="col-xs-6">
                        { this.state.dataLoaded && <PersonTimeTable people={ this.state.people } timeEntries={ this.state.timeEntries }/> }    
                    </div>
                </div>
                
            </CardText>
        </Card>

    );
  }

  handleExpandChange(){
      this.setState({ expanded: !this.state.expanded });

      axios.all([this.getTimeEntries(), this.getPeople()])
        .then(axios.spread((timeEntries, people) => {
            const nonAdmins = people.data.people.filter(person => !person.administrator);
            this.setState({ dataLoaded: true, people: nonAdmins, timeEntries: timeEntries.data['time-entries' ]})
            console.log(this.state.timeEntries);
        }));
  }

  getTimeEntries(){
      return axios.get(`/projects/${ this.props.project.id }/time_entries.json`)
  }

  getPeople(){
      return axios.get(`/projects/${ this.props.project.id }/people.json`)
  }
}

export default ProjectItem;
