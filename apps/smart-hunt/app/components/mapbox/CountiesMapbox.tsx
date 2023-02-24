'use client'

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

mapboxgl.accessToken = "pk.eyJ1Ijoia2FkZWlsbGlhbjIxIiwiYSI6ImNsZG54MnZzZDBua2wzdXFwZHhxdzBva2gifQ.bANYko0jxjqxRWQaHSsq0g";


const CountiesMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(-110.1);
  const [lat, setLat] = useState(47);
  const [zoom, setZoom] = useState(6.25);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/kadeillian/claitiml1001315pdm4ip7sh0",
        center: [lng, lat],
        zoom,
      });


      mapInstance.on("load", () => {
        setMap(mapInstance);
        mapInstance.resize();

        mapInstance.addSource("wolf", {
          type: "vector",
          url: "mapbox://kadeillian21.montana_counties"
        });

        mapInstance.addLayer({
          id: "montana_counties",
          type: "fill",
          source: {
            type: "vector",
            url: "mapbox://kadeillian21.montana_counties"
          },
          "source-layer": "wolf",
          paint: {
            "fill-color": "orange",
            "fill-opacity": 0.1,
          },
          minzoom: 0,
          maxzoom: 22,
        });
        mapInstance.addLayer({
          id: "montana_counties_line",
          type: "line",
          source: {
            type: "vector",
            url: "mapbox://kadeillian21.montana_counties"
          },
          "source-layer": "wolf",
          paint: {
            "line-color": "red",
            "line-width": 3,
          },
          minzoom: 0,
          maxzoom: 22,
        });
        mapInstance.addLayer({
          id: "county-labels",
          type: "symbol",
          source: "wolf",
          "source-layer": "wolf",
          layout: {
            "text-field": "{name}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
          paint: {
            "text-color": "blue",
          },
          minzoom: 0,
          maxzoom: 22,
        });
        mapInstance.on("click", "montana_counties", async (e) => {
          const feature = e.features[0];
          const county = feature.properties.name;
          const response = await axios.get("http://localhost:4200/api/elk_boone_and_crockett");
          const elkData = (response.data);
          const countyElkData = elkData.data.filter(elk => elk.county === county);
          let elkDataString = '';
          if (countyElkData.length > 0) {
            countyElkData.forEach(elk => {
              elkDataString +=
              `<p>Number of B&C Trophies Harvested: ${elk.trophy_count}</p>
              `
            });
          } else {
            elkDataString = '<p>No data available for this district</p>';
          }
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<p>County: ${county}</p>${elkDataString}`)
            .addTo(mapInstance);
        });
      });

    };

    if (!map && mapContainer.current) {
      initializeMap({ setMap, mapContainer });
    }
  }, [lat, lng, map, mapContainer, zoom]);
  return (
    <div
      ref={mapContainer}
      style={{ height: "100vh", width: "100vw" }}
    />
  );
};

export default CountiesMap;
