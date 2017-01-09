import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class FilterContainer extends Component {
    render() {
        return <TextField hintText="Hint Text" onChange={ this.props.handleValueChange }/>
    }
}

export default FilterContainer;
