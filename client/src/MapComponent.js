/*global google*/
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,

} from 'react-google-maps'
import React from 'react'
import {Polygon} from 'react-google-maps'
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer'
import parking_data from './data/parking_data.json';

<script src= "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization&key=AIzaSyCm_yPi4u2iAfSTSR-lAsrdWZHN-NbuIMI"></script>

export const MapComponent = withScriptjs( withGoogleMap(props => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: -41.2865, lng: 174.7762 }}>
      {props.isMarkerShown &&
        <Marker position={{ lat: -41.2865, lng: 174.7762 }} />}

      {parking_data.map(function (park) {
        const size = 0.00001;
        console.log(park.geometry);
        const coords = [
          { lat: park.geometry.y + size, lng: park.geometry.x + size },
          { lat: park.geometry.y + size, lng: park.geometry.x - size },
          { lat: park.geometry.y - size, lng: park.geometry.x - size },
          { lat: park.geometry.y - size, lng: park.geometry.x + size }
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
          ></Polygon>
        )
      })}

      <HeatmapLayer
      data= {getHeatMapData()}
      />

    </GoogleMap>
  ))
)

function getHeatMapData(){
  let data = []
  parking_data.map(function (park){
    data.push(new google.maps.LatLng(park.geometry.y, park.geometry.x))
  })
  return data
}
