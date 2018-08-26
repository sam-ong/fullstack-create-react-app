/* global google */
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'
import React from 'react'
import { Polygon } from 'react-google-maps'
import HeatmapLayer
  from 'react-google-maps/lib/components/visualization/HeatmapLayer'
import parking_data from './data/parking_data.json'
import {
  StandaloneSearchBox
} from 'react-google-maps/lib/components/places/StandaloneSearchBox';

import logo from './images/logo.png';
import HeatMap from './heatMapComponent';


<script src='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization&key=AIzaSyCm_yPi4u2iAfSTSR-lAsrdWZHN-NbuIMI' />

export const MapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE
        }
      }}
      defaultZoom={11}
      defaultCenter={{ lat: -41.2865, lng: 174.7762 }}
    >

      {props.isMarkerShown &&
        <Marker position={{ lat: -41.2865, lng: 174.7762 }} />}

      <div
        style={{
          position: 'fixed',
          top: '0',
          width: '100vw',
          height: '10vh',
          backgroundColor: 'rgba(255,139,40,1)',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        }}
      >

      <img id="logo" src={logo} />

        <StandaloneSearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={props.onPlacesChanged}
        >
          <input
          className='input'
            type='text'
            placeholder='Search for your destination'

          />
        </StandaloneSearchBox>
      </div>


      {
        props.data && props.data.express.map(function (park) {

        const size = 0.00001

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

      <HeatMap />


    </GoogleMap>
  ))
)
