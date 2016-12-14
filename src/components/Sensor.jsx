import React, {Component} from 'react'

class Sensor extends React.Component{
  render() {
    return (
        <item><button onClick={ () => ( this.props.getInformation(this.props.id) )}>{this.props.id}</button></item>
    );
  }
}

export default Sensor
