import React from 'react';
import PersonItem from './PersonItem';

const ProjectList = (props) => {

    const renderPeople = () => {
        return props.people.map(person => {
            const times = props.timeEntries.filter(entry => entry['person-id'] === person.id);
            return (
                <div className="row" key={ person.id }>
                    <div className="col-xs-12">
                        <PersonItem person={ person } times={ times }/>
                    </div>
                </div>
            )
        })
    }

    return <div>{ props.people && renderPeople() }</div>;
}

ProjectList.propTypes = {
    projects: React.PropTypes.arrayOf(React.PropTypes.object),
    timeEntries: React.PropTypes.arrayOf(React.PropTypes.object)
}
export default ProjectList;
