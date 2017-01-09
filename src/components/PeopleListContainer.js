import React, { Component } from 'react';
import PeopleList from './PeopleList';

import axios from 'axios';

class ProjectItemContainer extends Component {
    constructor() {
        super();
        this.state = {
            people: null,
            timeEntries: null,
        }
    }

    componentDidMount() {
        axios.all([this.getTimes(), this.getPeople()])
            .then(axios.spread((timeEntries, people) => {
                this.setState({ people: people.data.people.filter(person => !person.administrator), timeEntries: timeEntries.data['time-entries'], })
            }));
    }

  render() {
    return (
        <div>
            { this.state.people && this.renderPeopleList() }
        </div>

    );
  }

  renderPeopleList() {
        const peopleList = this.props.filterValue ? this.filterPeople() : this.state.people;
        return (
            <div className="row">
                <div className="col-xs-12">
                    <PeopleList 
                        people={ peopleList }
                        filterValue={ this.props.filterValue }
                        timeEntries={ this.state.timeEntries }/>
                </div>
            </div>
        )
  }

  filterPeople(){
      return this.state.people.filter(person => {
          const name = (person['first-name'] + '' + person['last-name']).toLowerCase();
          return name.indexOf(this.props.filterValue.toLowerCase()) > -1;
      })
  }

  getPeople(){
      const companyId = JSON.parse(localStorage.getItem('user'))['company-id'];
      return axios.get(`companies/${ companyId }/people.json`)
  }

  getTimes(){
      let today = new Date();
      // Set Date object to 9am this morning
      today = new Date(today.setHours(9, 0, 0));
      let one_week_ago = new Date();
      // Create Date object for exactly one week prior
      one_week_ago = new Date(one_week_ago.setDate(one_week_ago.getDate() - 7));

      return axios.get(`/time_entries.json?fromdate=${ this.formatDate(one_week_ago) }&todate=${ this.formatDate(today) }`)
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

export default ProjectItemContainer;
