/* global google */
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import { Polygon } from 'react-google-maps'
import React, { Component } from 'react';
import HeatmapLayer
  from 'react-google-maps/lib/components/visualization/HeatmapLayer';

<script src='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization&key=AIzaSyCm_yPi4u2iAfSTSR-lAsrdWZHN-NbuIMI' />

export default class HeatMap extends Component{

state = {
  data : null,
};

componentDidMount(){
  getHeatMapData()
  .then(res => this.setState({data: res}))
  .catch(err => console.log(err));

}

  render(){
    if(this.state.data){
      return (
        <React.Fragment>

          <HeatmapLayer
          data={this.state.data}
          options={{
            radius: 10,
            gradient: [
              'rgba(255, 200, 0, 0)',
              'rgba(255, 190, 0, 1)',
              'rgba(255, 180, 0, 1)',
              'rgba(255, 170, 0, 1)',
              'rgba(255, 160, 0, 1)',
              'rgba(255, 150, 0, 1)',
              'rgba(255, 140, 0, 1)',
              'rgba(255, 130, 0, 1)',
              'rgba(255, 120, 0, 1)',
              'rgba(255, 110, 0, 1)'
            ]
          }}
        />
      </React.Fragment>
    );
    }
    else return null;
  }

}



async function callApi() {
  const response = await fetch('/carpark/coordinates');

  const body  = await response.json();

  if (response.status !== 200 ) throw Error(body.message);
  return body;
}

function getHeatMapData () {
  let data = [];
  return callApi().then(parks=>{

    parks.express.map(function (park) {
      data.push(new google.maps.LatLng(park.y, park.x))
    })
    return data
  });

}
