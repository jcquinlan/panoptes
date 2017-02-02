import React, { Component } from 'react';
import Rx from 'rxjs/Rx';

const style  = {
    border: 'none',
    padding: '10px',
    width: '100%',
    outline: 'none',
    fontSize: '16px',
}

class DebouncedInput extends Component {
  constructor(props){
      super(props);
      const _this = this;
      
      this.subject = new Rx.Subject();
      this.subscription = this.subject
        .debounceTime(this.props.debounceTime)
        .subscribe(
          function (x) {
              _this.props.handleChange(x);
          }
      );
      
      this.localHandleChange = this.localHandleChange.bind(this);
      
    }
  
    localHandleChange(event){
        this.subject.next(Object.assign({}, event));
    }
 
  
    render(){
      return (<input style={ this.props.style } type="text" placeholder={ this.props.placeholder } onChange={ this.localHandleChange }/>) 
    }
}

DebouncedInput.defaultProps = {
    debounceTime: 500,
    placeholder: 'Enter search term.',
    style,
}

DebouncedInput.propTypes = {
  handleChange: React.PropTypes.func.isRequired,
  debounceTime: React.PropTypes.number,
  placeholder: React.PropTypes.string,
}

export default DebouncedInput;