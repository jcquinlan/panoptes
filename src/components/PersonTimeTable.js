import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class PersonTimeTable extends Component {
  render() {
    return (
        <Table>
            <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Hours 2 Weeks Ago</TableHeaderColumn>
                    <TableHeaderColumn>Hours Last Week</TableHeaderColumn>
                    <TableHeaderColumn>Hours This Week</TableHeaderColumn>
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
                <TableRowColumn>{ this.calculateTotalTime(person) }</TableRowColumn>
            </TableRow>
          )
      })
  }

  calculateTotalTime(person){
      const id = person.id;
      const time = this.props.timeEntries
        .filter(entry => entry['person-id'] == person.id)
        .reduce((sum, entry) => {
            const minutes = entry.hours * 60;
            return minutes + parseInt(entry.minutes);
        }, 0)
      return time;
  }
}

export default PersonTimeTable;
