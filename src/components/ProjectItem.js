import React, { Component } from 'react';
import { Card, CardText, CardHeader } from 'material-ui/Card';
import HorizontalBar from './HorizontalBar';
import ProjectTimeTable from './ProjectTimeTable';
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
            <CardText><strong>Hours To Date: </strong>{ this.props.timeTotal }</CardText>
            <CardText expandable={ true }>
                <div className="row">
                    <div className="col-xs-12">
                        { this.state.dataLoaded && <ProjectTimeTable people={ this.state.people } timeEntries={ this.state.timeEntries }/> }    
                    </div>
                </div>
                
            </CardText>
        </Card>

    );
  }

  handleExpandChange(){
      this.setState({ expanded: !this.state.expanded });

      if(!this.state.dataLoaded){
        axios.all([this.getTimeEntries(), this.getPeople()])
            .then(axios.spread((timeEntries, people) => {
                const nonAdmins = people.data.people.filter(person => !person.administrator);
                this.setState({ dataLoaded: true, people: nonAdmins, timeEntries: timeEntries.data['time-entries' ]})
            }));
      }
  }

  getTimeEntries(){
      const today = new Date();
      let three_weeks_ago = new Date();
      three_weeks_ago = new Date(three_weeks_ago.setDate(three_weeks_ago.getDate() - 21));
      
      return axios.get(`/projects/${ this.props.project.id }/time_entries.json?fromdate=${ this.formatDate(three_weeks_ago) }&todate=${ this.formatDate(today) }`)
  }

  getPeople(){
      return axios.get(`/projects/${ this.props.project.id }/people.json`)
  }

  formatDate(date){
      const month = this.appendZero(date.getMonth() + 1);
      const date_number = this.appendZero(date.getDate());
      return '' + date.getFullYear() + month + date_number;
  }

  appendZero(number){
      if(number < 10) return '0' + number;
      return number;
  }
}

export default ProjectItem;
