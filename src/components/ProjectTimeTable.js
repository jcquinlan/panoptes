import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class PersonTimeTable extends Component {
  render() {
    return (
        <Table>
            <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>2 Weeks Ago</TableHeaderColumn>
                    <TableHeaderColumn>Last Week</TableHeaderColumn>
                    <TableHeaderColumn>This Week</TableHeaderColumn>
                    <TableHeaderColumn>Total</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={ false }>
                { this.renderPeopleRows() }
            </TableBody>
        </Table>

    );
  }

  renderPeopleRows(){
     return this.props.people.map(person => {
          return (
            <TableRow key={ person.id }>
                <TableRowColumn>{ person['first-name'] + ' ' + person['last-name'] }</TableRowColumn>
                <TableRowColumn>{ this.calculateWeekTime(person, 2) } hrs.</TableRowColumn>
                <TableRowColumn>{ this.calculateWeekTime(person, 1) } hrs.</TableRowColumn>
                <TableRowColumn>{ this.calculateWeekTime(person, 0) } hrs.</TableRowColumn>
                <TableRowColumn>{ this.calculateTotalTime(person) /  60 } hrs.</TableRowColumn>
            </TableRow>
          )
      })
  }

  calculateTotalTime(person){
      const time = this.props.timeEntries
        .filter(entry => entry['person-id'] === person.id)
        .reduce((sum, entry) => {
            const minutes = entry.hours * 60;
            return sum + minutes + parseInt(entry.minutes, 10);
        }, 0)
      return time;
  }

  calculateWeekTime(person, week){
      let current_time = new Date();
      let final_time = new Date();
      const current_day = current_time.getDay();
      // If it is earlier than Saturday (6), get the number of days until Saturday
      const day_difference = !(current_day >= 6) ?  6 - current_day : 0;
      final_time = Math.floor(final_time.setDate(final_time.getDate() + day_difference)) / 1000;

      const six_days_in_seconds = 518400;
      const week_in_seconds = 604800;
      const timeframe = [final_time - (week * week_in_seconds), final_time - ((week * week_in_seconds) + six_days_in_seconds)];

      const time = this.props.timeEntries
        .filter(entry => entry['person-id'] === person.id)
        .filter(entry => {
            const date = Math.floor(new Date(entry.date).getTime() / 1000);
            return date < timeframe[0] && date > timeframe[1];
        })
        .reduce((sum, entry) => {
            const minutes = entry.hours * 60;
            return sum + minutes + parseInt(entry.minutes, 10);
        }, 0)
      return (time / 60).toFixed(2);
  }
}

export default PersonTimeTable;
