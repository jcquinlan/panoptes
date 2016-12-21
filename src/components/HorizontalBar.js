import React, { Component } from 'react';

class HorizontalBar extends Component {
  render() {
    return (
        <svg height="30" width="100%">
            <rect width="100%" height="30" fill="#ddd"></rect>
            <rect width={ this.calculatePercentageFilled() + '%' } height="30" fill={ this.calculateColor() }></rect>
        </svg>

    );
  }

  calculatePercentageFilled() {
      const total = this.props.total;
      const partial = this.props.partial;

      if(total && partial){
          if(partial >= total){
              return 100;
          }
          return ((this.props.partial / this.props.total) * 100);
      }
  }

  calculateColor(){
      const total = this.props.total;
      const partial = this.props.partial;

      if(total && partial){
          if(partial >= total){
              return '#ff0000';
          }
          return 'green';
      }
      return 'transparent';
  }
}

export default HorizontalBar;
