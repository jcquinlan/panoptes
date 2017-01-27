import React from 'react';
import TextField from 'material-ui/TextField';

const FilterContainer = (props) => {
    return <TextField hintText="Search People" onChange={ props.handleValueChange } underlineShow={ false } style={{ paddingLeft: '20px' }}/>
}

export default FilterContainer;
