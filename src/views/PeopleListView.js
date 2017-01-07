import React, { Component } from 'react';
import PeopleListContainer from '../components/PeopleListContainer';
import ViewTitle from '../components/ViewTitle';

class ProjectListView extends Component {
    constructor(){
        super();
        this.state = {
            error: '',
        }
    }

    render() {
        return (
            <div>
                <ViewTitle>People</ViewTitle>
                <PeopleListContainer />
            </div>
        );
    }

    setError(error){
        this.setState({ error });
    }


}

export default ProjectListView;
