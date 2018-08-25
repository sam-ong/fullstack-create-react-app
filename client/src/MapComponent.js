import {withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React from "react"
import {Polygon} from "react-google-maps"


const coords = [
  {lat: -41.251470, lng: 174.704399},
  {lat: -41.285118, lng: 174.743470},
  {lat: -41.282696, lng: 174.682161}
]

export const MapComponent = withScriptjs(withGoogleMap((props) =>

  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -41.2865, lng: 174.7762}}
  >
    {props.isMarkerShown && <Marker position={{ lat: -41.2865, lng: 174.7762 }} />}
    <Polygon path = {coords}
      key = {1}
    options = {{
      fillCollor: "#000",
      fillOpacity: 0.4
    }}
    onClick = {() =>
      console.log("yes")
    }
    />


  </GoogleMap>
))
