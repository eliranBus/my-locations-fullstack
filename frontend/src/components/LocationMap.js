import React from "react";
import { Map, Marker } from "pigeon-maps";

export default function LocationMap({location}) {
  const coordinates = location.coordinates;
  var commaPos = coordinates.indexOf(',');
  var coordinatesLat = parseFloat(coordinates.substring(0, commaPos));
  var coordinatesLong = parseFloat(coordinates.substring(commaPos + 1, coordinates.length));

  return (
    <div className="location-map">
      <Map height={300} defaultCenter={[coordinatesLat, coordinatesLong]} defaultZoom={14}>
        <Marker width={50} anchor={[coordinatesLat, coordinatesLong]} />
      </Map>
    </div>
  )
}