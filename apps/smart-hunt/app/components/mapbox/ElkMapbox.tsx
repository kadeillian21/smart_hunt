'use client'

import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import UseGetElkData from "../../hooks/getSpecies/getElk";
import { Elk } from "../../../types/elk";
import axios from "axios";

mapboxgl.accessToken = "pk.eyJ1Ijoia2FkZWlsbGlhbjIxIiwiYSI6ImNsZG54MnZzZDBua2wzdXFwZHhxdzBva2gifQ.bANYko0jxjqxRWQaHSsq0g";


const ElkAndDeerMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(-110.1);
  const [lat, setLat] = useState(47);
  const [zoom, setZoom] = useState(6.25);
  const [elkData, setElkData] = useState<Elk[]>([]);

  const fetchElkData = async () => {
    try {
      const response = await axios.get("http://localhost:4200/api/elk");
      setElkData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

        mapInstance.addSource("deer-and-elk-hunting-district", {
          type: "vector",
          url: "mapbox://kadeillian21.deer-and-elk-hunting-districts"
        });

        mapInstance.addLayer({
          id: "deer-and-elk-hunting-district-layer",
          type: "fill",
          source: {
            type: "vector",
            url: "mapbox://kadeillian21.deer-and-elk-hunting-districts"
          },
          "source-layer": "deer-and-elk",
          paint: {
            "fill-color": "orange",
            "fill-opacity": 0.1,
          },
          minzoom: 0,
          maxzoom: 22,
        });
        mapInstance.addLayer({
          id: "deer-and-elk-hunting-district-line",
          type: "line",
          source: {
            type: "vector",
            url: "mapbox://kadeillian21.deer-and-elk-hunting-districts"
          },
          "source-layer": "deer-and-elk",
          paint: {
            "line-color": "red",
            "line-width": 3,
          },
          minzoom: 0,
          maxzoom: 22,
        });
        mapInstance.addLayer({
          id: "deer-and-elk-hunting-district-labels",
          type: "symbol",
          source: "deer-and-elk-hunting-district",
          "source-layer": "deer-and-elk",
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
        mapInstance.on("click", "deer-and-elk-hunting-district-layer", (e) => {

          const feature = e.features[0];
          const district = feature.properties.DISTRICT;
          const districtElkData = elkData.filter((elk: Elk) => elk.hunting_district === district);
          let elkDataString = '';
          if (districtElkData.length > 0) {
            districtElkData.forEach((elk: Elk) => {
              elkDataString += `<p>Year: ${elk.license_year}</p><p>Population: ${elk.bow}</p>`;
            });
          } else {
            elkDataString = '<p>No data available for this district</p>';
          }
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<p>District: ${district}</p>${elkDataString}`)
            .addTo(mapInstance);
        });
      });

    };

    if (!map && mapContainer.current) {
      initializeMap({ setMap, mapContainer });
    }
  }, [lat, lng, map, mapContainer, zoom, elkData]);
  return (
    <div
      ref={mapContainer}
      style={{ height: "100vh", width: "100vw" }}
    />
  );
};

export default ElkAndDeerMap;
