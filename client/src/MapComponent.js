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
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox'
;<script src='https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization&key=AIzaSyCm_yPi4u2iAfSTSR-lAsrdWZHN-NbuIMI' />

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
          display: 'fixed',
          top: '0',
          width: '100vw',
          height: '10vh',
          backgroundColor: '#FF0000'
        }}
      >
      <StandaloneSearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={props.onPlacesChanged}
        >
          <input
            type='text'
            placeholder=''
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `27px`,
              marginLeft: '27px',
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              backgroundColor: 'rgba(255,139,40,1)',
              color: 'rgba(255,255,255,1)'
            }}
          />
        </StandaloneSearchBox>
      </div>

      {parking_data.map(function (park) {
        const size = 0.00001
        console.log(park.geometry)
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
          />
        )
      })}

      <HeatmapLayer
      data= {getHeatMapData()}
      options ={{
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
      />

    </GoogleMap>
  ))
)

function getHeatMapData () {
  let data = []
  parking_data.map(function (park) {
    data.push(new google.maps.LatLng(park.geometry.y, park.geometry.x))
  })
  return data
}
