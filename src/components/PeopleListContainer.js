import React from 'react';
import PeopleList from './PeopleList';

const PeopleListContainer = (props) => {

    return (
        <div className="row">
            <div className="col-xs-12">
                <PeopleList 
                    people={ props.people }
                    filterValue={ props.filterValue }
                    timeEntries={ props.timeEntries }/>
            </div>
        </div>
    ); 
}

export default PeopleListContainer;
