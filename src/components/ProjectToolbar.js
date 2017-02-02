import React from 'react';
import FilterContainer from '../components/FilterContainer';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

const ProjectToolbar = (props) => {

    return (
        <Paper zDepth={ 1 }>
        <Toolbar style={{ backgroundColor: '#fff', marginBottom: '36px' }}>
            <ToolbarGroup firstChild={true}>
                <FilterContainer handleValueChange={ props.handleValueChange }/>
            </ToolbarGroup>
            <ToolbarGroup>
                <Chip backgroundColor={ '#13C15B' } labelColor={ '#fff' }>{ props.numberOfProjects } total</Chip>
            </ToolbarGroup>
        </Toolbar>
        </Paper>
    );
}

ProjectToolbar.propTypes = {
    numberofProjects: React.PropTypes.number,
}

export default ProjectToolbar;
