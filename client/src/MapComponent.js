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
} from 'react-google-maps/lib/components/places/StandaloneSearchBox'
import logo from './images/logo.png';
import HeatMap from './heatMapComponent';
import arrow from './images/arrow-icon.png';

<script src='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization&key=AIzaSyCm_yPi4u2iAfSTSR-lAsrdWZHN-NbuIMI' />


export const MapComponent = withScriptjs(
  withGoogleMap(props => (
    <div className='main-container'>
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
        ref={mapInstance => {
          this.mapInstance = mapInstance
        }}
      >

        {props.isMarkerShown &&
          <Marker position={{ lat: -41.2865, lng: 174.7762 }} />}

        <div className='sliding-menu-container'>
          <StandaloneSearchBox
            ref={searchBox => {
              this.searchBox = searchBox
            }}
            bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={() => {
              const bounds = new google.maps.LatLngBounds()
              const places = this.searchBox.getPlaces()

              places.forEach(place => {
                if (place.geometry.viewport) {
                  bounds.union(place.geometry.viewport)
                } else {
                  bounds.extend(place.geometry.location)
                }
              })
              this.mapInstance.fitBounds(bounds)
            }}
              >
              <input
                className='input'
                id='location-search'
                type='text'
                placeholder='Search for your destination'
              />
            </StandaloneSearchBox>
            <div className='date-time-container'>
              <input type='date' className='input' value='2018-08-26' />
              <input type='time' className='input' value='19:15:00' />
            </div>
            <div id='drop-button-container'>
            <img id='arrow' src={arrow} onClick={function () {
                  var slider = document.getElementsByClassName(
                    'sliding-menu-container'
                  )[0]
                  console.log(slider)
                  if (slider.classList.contains('active')) {
                    slider.classList.remove('active')
                  } else {
                    slider.classList.add('active')
                  }
                }}/>
            </div>
          </div>
          <div
          style={{
            position: 'fixed',
            top: '0',
            width: '100vw',
            height: '60px',
            backgroundColor: 'rgba(255,139,40,1)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`
          }}
        >

          <img id='logo' src={logo} />

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
    </div>
  ))
)

function onPlacesChanged (data) {
  console.log('places changed ' + data)
}

