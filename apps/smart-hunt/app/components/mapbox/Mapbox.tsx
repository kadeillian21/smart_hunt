'use client'

import React, { useRef, useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import FilterBar from "../UI/FilterBar";
import axios from "axios";
import mapboxStore from "../../mapboxStoreMobX";

mapboxgl.accessToken = "pk.eyJ1Ijoia2FkZWlsbGlhbjIxIiwiYSI6ImNsZG54MnZzZDBua2wzdXFwZHhxdzBva2gifQ.bANYko0jxjqxRWQaHSsq0g";

const Mapbox = observer(() => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState(null);
  const [lng, setLng] = useState(-110.1);
  const [lat, setLat] = useState(47);
  const [zoom, setZoom] = useState(6.25);
  const { speciesState } = mapboxStore

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

        if (speciesState === "Elk") {
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
        mapInstance.on("click", "deer-and-elk-hunting-district-layer", async (e) => {
          const feature = e.features[0];
          const district = feature.properties.DISTRICT;
          const response = await axios.get("http://localhost:4200/api/elk");
          const elkData = (response.data);
          const districtElkData = elkData.data.filter(elk => elk.hunting_district === district && elk.license_year === 2021 && elk.residency === 'SUM');
          let elkDataString = '';
          if (districtElkData.length > 0) {
            districtElkData.forEach(elk => {
              elkDataString +=
              `<p>Year: ${elk.license_year}</p>
              <p>Hunters: ${elk.hunters}</p>
              <p>Days: ${elk.days}</p>
              <p>Days per Hunter: ${elk.days_per_hunter}</p>
              <p>Total Harvest: ${elk.total_harvest}</p>
              <p>Bulls: ${elk.bulls}</p>
              <p>Cows: ${elk.cows}</p>
              <p>Calves: ${elk.calves}</p>
              <p>Bow: ${elk.bow}</p>
              <p>Rifle: ${elk.rifle}</p>
              <p>Spiked Bull Elk: ${elk.spike_bull_elk}</p>
              <p>Less than Six Points: ${elk.less_than_six_points}</p>
              <p>Six or More Points: ${elk.six_or_more_points}</p>
              <p>Location: ${elk.location}</p>
              <p>District Square Mileage: ${elk.district_square_mileage}</p>
              <p>Public Land Percentage: ${elk.public_land_percentage}</p>
              <p>DIY Hunting Maps Success Rate: ${elk.diy_hunting_maps_hunt_success_rate}</p>
              <p>Six or More Point Bulls Percentage: ${elk.six_or_more_point_bulls_percentage}%</p>
              <p>Harvested Bulls per Square Mile: ${elk.harvested_bulls_per_square_mile}</p>
              <p>Harvested Cows per Square Mile: ${elk.harvested_cows_per_square_mile}</p>
              <p>Harvested Calves per Square Mile: ${elk.harvested_calves_per_square_mile}</p>
              <p>Harvested Spiked Bulls per Square Mile: ${elk.harvested_spiked_bulls_per_square_mile}</p>
              <p>Harvested Less than Six Point Bulls per Square Mile: ${elk.harvested_less_than_six_point_bulls_per_square_mile}</p>
              <p>Harvested Six or More Point Bulls per Square Mile: ${elk.harvested_six_or_more_point_bulls_per_square_mile}</p>
              <p>Total Harvest per Square Mile: ${elk.total_harvest_per_square_mile}</p>`;
            });
          } else {
            elkDataString = '<p>No data available for this district</p>';
          }
          new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<p>District: ${district}</p>${elkDataString}`)
            .addTo(mapInstance);
        });
      } else if (speciesState === "Antelope") {
        mapInstance.addSource("antelope", {
          type: "vector",
          url: "mapbox://kadeillian21.antelope"
        });

        mapInstance.addLayer({
          id: "antelope-layer",
          type: "line",
          source: {
            type: "vector",
            url: "mapbox://kadeillian21.antelope"
          },
          "source-layer": "antelope",
          paint: {
            "line-color": "orange",
            "line-width": 3,
          },
          minzoom: 0,
          maxzoom: 22,
        });
        mapInstance.addLayer({
          id: "antelope-labels",
          type: "symbol",
          source: "antelope",
          "source-layer": "antelope",
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
      } else if (speciesState === "Bighorn Sheep") {
        mapInstance.addSource("bighorn-sheep", {
          type: "vector",
          url: "mapbox://kadeillian21.bighorn-sheep"
        });

        mapInstance.addLayer({
          id: "bighorn-sheep-layer",
          type: "line",
          source: {
            type: "vector",
            url: "mapbox://kadeillian21.bighorn-sheep"
          },
          "source-layer": "bighorn-sheep",
          paint: {
            "line-color": "orange",
            "line-width": 3,
          },
          minzoom: 0,
          maxzoom: 22,
        });
        mapInstance.addLayer({
          id: "bighorn-sheep-labels",
          type: "symbol",
          source: "bighorn-sheep",
          "source-layer": "bighorn-sheep",
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
      } else if (speciesState === "Black Bear") {
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
      } else if (speciesState === "Moose") {
        mapInstance.addSource("moose", {
          type: "vector",
          url: "mapbox://kadeillian21.moose"
        });

        mapInstance.addLayer({
          id: "moose-layer",
          type: "line",
          source: {
            type: "vector",
            url: "mapbox://kadeillian21.moose"
          },
          "source-layer": "moose",
          paint: {
            "line-color": "orange",
            "line-width": 3,
          },
          minzoom: 0,
          maxzoom: 22,
        });
        mapInstance.addLayer({
          id: "moose-labels",
          type: "symbol",
          source: "moose",
          "source-layer": "moose",
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
      } else if (speciesState === "Mountain Goat") {
        mapInstance.addSource("mountain-goat", {
          type: "vector",
          url: "mapbox://kadeillian21.mountain-goat"
        });

        mapInstance.addLayer({
          id: "mountain-goat-layer",
          type: "line",
          source: {
            type: "vector",
            url: "mapbox://kadeillian21.mountain-goat"
          },
          "source-layer": "mountain-goat",
          paint: {
            "line-color": "orange",
            "line-width": 3,
          },
          minzoom: 0,
          maxzoom: 22,
        });
        mapInstance.addLayer({
          id: "mountain-goat-labels",
          type: "symbol",
          source: "mountain-goat",
          "source-layer": "mountain-goat",
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
      } else if (speciesState === "Mountain Lion") {
        mapInstance.addSource("mountain-lion", {
          type: "vector",
          url: "mapbox://kadeillian21.mountain-lion"
        });

        mapInstance.addLayer({
          id: "mountain-lion-layer",
          type: "line",
          source: {
            type: "vector",
            url: "mapbox://kadeillian21.mountain-lion"
          },
          "source-layer": "mountain-lion",
          paint: {
            "line-color": "orange",
            "line-width": 3,
          },
          minzoom: 0,
          maxzoom: 22,
        });
        mapInstance.addLayer({
          id: "mountain-lion-labels",
          type: "symbol",
          source: "mountain-lion",
          "source-layer": "mountain-lion",
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
      } else if (speciesState === "Mule Deer") {
        mapInstance.addSource("deer-and-elk-hunting-district", {
          type: "vector",
          url: "mapbox://kadeillian21.deer-and-elk-hunting-districts"
        });

        mapInstance.addLayer({
          id: "deer-and-elk-hunting-district-layer",
          type: "line",
          source: {
            type: "vector",
            url: "mapbox://kadeillian21.deer-and-elk-hunting-districts"
          },
          "source-layer": "deer-and-elk",
          paint: {
            "line-color": "orange",
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
      } else if (speciesState === "Turkey") {
        mapInstance.addSource("turkey", {
          type: "vector",
          url: "mapbox://kadeillian21.turkey"
        });

        mapInstance.addLayer({
          id: "turkey-layer",
          type: "line",
          source: {
            type: "vector",
            url: "mapbox://kadeillian21.turkey"
          },
          "source-layer": "turkey",
          paint: {
            "line-color": "orange",
            "line-width": 3,
          },
          minzoom: 0,
          maxzoom: 22,
        });
        mapInstance.addLayer({
          id: "turkey-labels",
          type: "symbol",
          source: "turkey",
          "source-layer": "turkey",
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
      } else if (speciesState === "Upland Game") {
        mapInstance.addSource("upland-game", {
          type: "vector",
          url: "mapbox://kadeillian21.upland-game"
        });

        mapInstance.addLayer({
          id: "upland-game-layer",
          type: "line",
          source: {
            type: "vector",
            url: "mapbox://kadeillian21.upland-game"
          },
          "source-layer": "upland-game",
          paint: {
            "line-color": "orange",
            "line-width": 3,
          },
          minzoom: 0,
          maxzoom: 22,
        });
        mapInstance.addLayer({
          id: "upland-game-labels",
          type: "symbol",
          source: "upland-game",
          "source-layer": "upland-game",
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
      } else if (speciesState === "Whitetail Deer") {
        mapInstance.addSource("deer-and-elk-hunting-district", {
          type: "vector",
          url: "mapbox://kadeillian21.deer-and-elk-hunting-districts"
        });

        mapInstance.addLayer({
          id: "deer-and-elk-hunting-district-layer",
          type: "line",
          source: {
            type: "vector",
            url: "mapbox://kadeillian21.deer-and-elk-hunting-districts"
          },
          "source-layer": "deer-and-elk",
          paint: {
            "line-color": "orange",
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
      } else if (speciesState === "Wolf") {
        mapInstance.addSource("wolf", {
          type: "vector",
          url: "mapbox://kadeillian21.wolf"
        });

        mapInstance.addLayer({
          id: "wolf-layer",
          type: "line",
          source: {
            type: "vector",
            url: "mapbox://kadeillian21.wolf"
          },
          "source-layer": "wolf",
          paint: {
            "line-color": "orange",
            "line-width": 3,
          },
          minzoom: 0,
          maxzoom: 22,
        });
        mapInstance.addLayer({
          id: "wolf-labels",
          type: "symbol",
          source: "wolf",
          "source-layer": "wolf",
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
      }}

      );

    };

    if (!map && mapContainer.current) {
      initializeMap({ setMap, mapContainer });
    }
  }, [lat, lng, map, mapContainer, speciesState, zoom]);

  return (
    <div>
      <div className="sticky top-0 z-50">
        <FilterBar />
      </div>
      <div
        ref={mapContainer}
        style={{ height: "100vh", width: "100vw" }}
      />
    </div>
  );
});

export default Mapbox;
