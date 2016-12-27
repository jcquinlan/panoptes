import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class PersonTimeTable extends Component {
  render() {
    return (
        <Table>
            <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                <TableRow>
                    <TableHeaderColumn>Name</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
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
                <TableRowColumn>{ person['last-name'] }</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
          )
      })
  }
}

export default PersonTimeTable;
