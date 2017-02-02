import React, { Component } from 'react';
import PeopleListContainer from '../components/PeopleListContainer';
import ViewTitle from '../components/ViewTitle';
import PeopleToolbar from '../components/PeopleToolbar';
import CustomLoadingSpinner from '../components/CustomLoadingSpinner';

import axios from 'axios';

class ProjectListView extends Component {
    constructor(){
        super();
        this.state = {
            error: '',
            filterValue: '',
            people: [],
            timeEntries: [],
        }

        this.setFilterValue = this.setFilterValue.bind(this);
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
                <ViewTitle>People</ViewTitle>
                { !this.state.people.length && <CustomLoadingSpinner/> }
                { this.state.people.length && <PeopleToolbar handleValueChange={ this.setFilterValue } numberOfPeople={ this.state.people.length }/> }
                { this.state.people.length && <PeopleListContainer people={ this.state.people } timeEntries={ this.state.timeEntries } filterValue={ this.state.filterValue }/> }
            </div>
        );
    }

    setError(error){
        this.setState({ error });
    }

    setFilterValue(event){
        this.setState({ filterValue: event.target.value });
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

export default ProjectListView;
