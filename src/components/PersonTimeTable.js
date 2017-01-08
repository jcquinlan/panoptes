import React from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const PersonTimeTable = (props) => {

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',];

    const renderDayHeaders = () => {
        return days.map(day => {
            return <TableHeaderColumn key={ day }>{ day }</TableHeaderColumn>
        })
    }

    const renderDayRow = () => {
        const today = new Date().getDay();

        return days
            .map((day, index) => {
                let iterative_day = new Date();
                let iterative_day_prior = new Date();

                iterative_day = new Date(iterative_day.setDate(iterative_day.getDate() - (today - index)));
                iterative_day_prior = new Date(iterative_day_prior.setDate(iterative_day_prior.getDate() - (today - (index + 1))));

                iterative_day = new Date(iterative_day.setHours(9, 0, 0)).getTime();
                iterative_day_prior = new Date(iterative_day_prior.setHours(9, 0, 0)).getTime();

                const total = props.times.filter(time => {
                    const date = new Date(time.date).getTime();
                    return date > iterative_day && date < iterative_day_prior;

                })
                .reduce((sum, time) => {
                    return sum + ((parseInt(time.hours, 10) * 60) + parseInt(time.minutes, 10));
                }, 0)

                return <TableRowColumn key={ day }>{ index >= today ? '-' : total / 60}</TableRowColumn>
        })
    }

    return (
        <Table>
            <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
                <TableRow>
                    { renderDayHeaders() }
                    <TableHeaderColumn>Total</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={ false }>
                <TableRow>
                    { renderDayRow() }
                    <TableHeaderColumn>40</TableHeaderColumn>
                </TableRow>
            </TableBody>
        </Table>

    );
}

export default PersonTimeTable;
