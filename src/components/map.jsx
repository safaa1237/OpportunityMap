import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import * as parkDate from "../data/skateboard-parks.json";
import axios from "axios";
import Authentication from "./authentication";
import ACCMOCK from '../data/MOCK_ACC.json';
import google from "google-maps"

export default function Map() {
  const [viewPort, setViewPort] = useState({
      latitude:48.7758,
      longitude: 9.1829,
      zoom:10,
      width:"100vw",
      height:"100vh"
  });
  const [selectedPark, setSelectedPark] = useState(null);
  const getLocation =(address) => {
  let geocoder = new google.maps.Geocoder();
  
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      console.log(latitude, longitude);
      } 
  }); 
}

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);
    getLocation('New York');
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(async() => {
    // getAccount();
    const res = await axios.get('https://test-90.mycrmspace.de/rest/v11_8/Opportunities', {
      headers: {
        'Authorization': "Bearer 16d1adfc-9790-4ab9-9f45-2c0f0593d7a1",
        "Access-Control-Allow-Headers": "Authorization header"
      }
    });
    res.then(data => console.log(data))
  });

  return <div>
      <ReactMapGL {...viewPort}  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={viewPort => {
        setViewPort(viewPort);
      }}
      >
      {ACCMOCK.map((park)=>
      (
        <Marker  key={park.properties.PARK_ID}
        latitude={park.geometry.coordinates[1]}
        longitude={park.geometry.coordinates[0]}>
            <button
            className="marker-btn"
            onClick={(e) => {
              e.preventDefault();
              setSelectedPark(park);
            }}
          >
            here</button>
        </Marker>
      ))}

      {selectedPark ? (
        <Popup
          latitude={selectedPark.geometry.coordinates[1]}
          longitude={selectedPark.geometry.coordinates[0]}
          onClose={() => {
            setSelectedPark(null);
          }}
        >
          <div>
            <h2>{selectedPark.properties.NAME}</h2>
            <p>{selectedPark.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
      ) : null}
      </ReactMapGL>
  </div>;
  }

  