/* global google */
import React, { Component } from 'react';
import './App.css';
import {MapComponent} from './MapComponent';
import parking_data from './data/parking_data.json';
import {Polygon} from "react-google-maps"
import styles from './styles.css';
import logo from './logo.svg';
import './App.css';

<script src='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization&key=AIzaSyCm_yPi4u2iAfSTSR-lAsrdWZHN-NbuIMI' />

class App extends Component {
  state = {
    data: null,
  };

  componentDidMount(){
    callApi()
    .then(res => this.setState({data: res}))
    .catch(err => console.log(err));
  }

  render() {

    return (
      <div className="App">

      {
        this.state.data &&
        <MapComponent
          data={this.state.data}
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization&key=AIzaSyCm_yPi4u2iAfSTSR-lAsrdWZHN-NbuIMI"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        >
        </MapComponent>
      }

      </div>
    );
  }
}

async function callApi() {
  const response = await fetch('/carpark/coordinates');

  const body  = await response.json();

  if (response.status !== 200 ) throw Error(body.message);
  return body;
}


export default App;
