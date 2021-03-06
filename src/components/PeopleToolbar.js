import React from 'react';
import FilterContainer from '../components/FilterContainer';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

const PeopleToolbar = (props) => {

    return (
        <Paper zDepth={ 1 }>
        <Toolbar style={{ backgroundColor: '#fff', marginBottom: '36px' }}>
            <ToolbarGroup firstChild={true}>
                <FilterContainer handleValueChange={ props.handleValueChange }/>
            </ToolbarGroup>
            <ToolbarGroup>
                <Chip backgroundColor={ '#13C15B' } labelColor={ '#fff' }>{ props.numberOfPeople } total</Chip>
            </ToolbarGroup>
        </Toolbar>
        </Paper>
    );
}

PeopleToolbar.propTypes = {
    numberofPeople: React.PropTypes.number,
}

export default PeopleToolbar;
