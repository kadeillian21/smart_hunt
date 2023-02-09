'use client'

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1Ijoia2FkZWlsbGlhbjIxIiwiYSI6ImNsZG54MnZzZDBua2wzdXFwZHhxdzBva2gifQ.bANYko0jxjqxRWQaHSsq0g";

const BlackBearMap = () => {
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

        mapInstance.addSource("black-bear", {
          type: "vector",
          url: "mapbox://kadeillian21.black-bear"
        });

        mapInstance.addLayer({
          id: "black-bear-layer",
          type: "line",
          source: {
            type: "vector",
            url: "mapbox://kadeillian21.black-bear"
          },
          "source-layer": "black-bear",
          paint: {
            "line-color": "orange",
            "line-width": 3,
          },
          minzoom: 0,
          maxzoom: 22,
        });
        mapInstance.addLayer({
          id: "black-bear-labels",
          type: "symbol",
          source: "black-bear",
          "source-layer": "black-bear",
          layout: {
            "text-field": "{DISTRICT}",
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
          paint: {
            "text-color": "blue",
          },
          minzoom: 0,
          maxzoom: 22,
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

export default BlackBearMap;
