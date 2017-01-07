import React, { Component } from 'react';
import PersonItem from './PersonItem';

const ProjectList = (props) => {
    const renderPeople = () => {
        return props.people.map(person => {
            const times = props.timeEntries.filter(entry => entry['person-id'] == person.id);
            return <PersonItem key={ person.id } person={ person } times={ times }/>
        })
    }

    return <div>{ props.people && renderPeople() }</div>;
}

ProjectList.propTypes = {
    projects: React.PropTypes.arrayOf(React.PropTypes.object),
    timeEntries: React.PropTypes.arrayOf(React.PropTypes.object)
}
export default ProjectList;
