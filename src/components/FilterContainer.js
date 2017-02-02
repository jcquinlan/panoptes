import React from 'react';
import TextField from 'material-ui/TextField';
import DebouncedInput from './DebouncedInput';

const FilterContainer = (props) => {
    // return <TextField hintText={ props.hintText } onChange={ props.handleValueChange } underlineShow={ false } style={{ paddingLeft: '20px' }}/>
    return <DebouncedInput handleChange={ props.handleValueChange } debounceTime={ 200 }/>
}

export default FilterContainer;
