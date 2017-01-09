import React, { Component } from 'react';
import PeopleListContainer from '../components/PeopleListContainer';
import FilterContainer from '../components/FilterContainer';
import ViewTitle from '../components/ViewTitle';

class ProjectListView extends Component {
    constructor(){
        super();
        this.state = {
            error: '',
            filterValue: '',
        }

        this.setFilterValue = this.setFilterValue.bind(this);
    }

    render() {
        return (
            <div>
                <ViewTitle>People</ViewTitle>
                <FilterContainer handleValueChange={ this.setFilterValue }/>
                <PeopleListContainer filterValue={ this.state.filterValue }/>
            </div>
        );
    }

    setError(error){
        this.setState({ error });
    }

    setFilterValue(event, value){
        this.setState({ filterValue: value });
    }
}

export default ProjectListView;
