/* global google */
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
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
      return (<HeatmapLayer
        data={this.state.data}
        options={{
          radius: 10,
          gradient: [
            'rgba(255, 245, 10, 0)',

            'rgba(255, 245, 10, 1)',
            'rgba(255, 220, 13, 1)',
            'rgba(255, 196, 16, 1)',

            'rgba(255, 171, 19, 1)',
            'rgba(255, 147, 22, 1)',
            'rgba(255, 122, 25, 1)',
            'rgba(255, 98, 28, 1)',
            'rgba(255, 73, 31, 1)',
            'rgba(255, 49, 34, 1)',
            'rgba(255, 24, 37, 1)'
          ]
        }}
      />);

      {parking_data.map(function (park) {
        const size = 0.00001
        // console.log(park.geometry)
        const coords = [
          { lat: park.y + size, lng: park.x + size },
          { lat: park.y + size, lng: park.x - size },
          { lat: park.y - size, lng: park.x - size },
          { lat: park.y - size, lng: park.x + size }
        ]
        return (
          <Polygon
            path={coords}
            key={1}
            options={{
              fillColor: '#FF5722',
              fillOpacity: 0.4,
              strokeWeight: 0
            }}
            onClick={() => console.log('yes')}
          />
        )
      })}
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
