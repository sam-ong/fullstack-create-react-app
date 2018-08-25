import {withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React from "react"


export const MapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -41.2865, lng: 174.7762}}
  >
    {props.isMarkerShown && <Marker position={{ lat: -41.2865, lng: 174.7762 }} />}
  </GoogleMap>
))
