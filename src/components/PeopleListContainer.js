import React, { PureComponent } from 'react';
import PeopleList from './PeopleList';

class PeopleListContainer extends PureComponent {
    constructor(props){
        super(props);
    }

    render(){
        const people = this.props.people.filter(person => {
            const name = (`${ person['first-name'] } ${ person['last-name'] }`).toLowerCase();
            return name.indexOf(this.props.filterValue.toLowerCase()) > -1;
        })
        return (
            <div className="row">
                <div className="col-xs-12">
                    <PeopleList 
                        people={ people }
                        timeEntries={ this.props.timeEntries }/>
                </div>
            </div>
        ); 
    }
}

export default PeopleListContainer;
