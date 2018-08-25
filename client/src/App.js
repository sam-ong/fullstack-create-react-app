import React, { Component } from 'react';
import './App.css';
import {MapComponent} from './MapComponent';
import parking_data from './data/parking_data.json';
import {Polygon} from "react-google-maps"

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
      >



      </MapComponent>

      <ul>
       {
         parking_data.map(function(park){
           return <li>{park.geometry.x} - {park.geometry.y}</li>;
         })
       }
       </ul>

      </div>
    );
  }
}

export default App;
