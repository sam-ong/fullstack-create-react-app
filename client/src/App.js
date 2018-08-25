import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {MapComponent} from './MapComponent'

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
    .then(res => this.setState({ response: res.express} ))
    .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('/api/hello');
    const body  = await response.json();

    if (response.status !== 200 ) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div className="App">


      <MapComponent
      isMarkerShown
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCm_yPi4u2iAfSTSR-lAsrdWZHN-NbuIMI"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      />
      </div>
    );
  }
}

export default App;
