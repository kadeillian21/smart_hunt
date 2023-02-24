'use client'

import React, { useRef, useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';
import "mapbox-gl/dist/mapbox-gl.css";
import FilterBar from "../UI/FilterBar";
import mapboxStore from "../../mapboxStoreMobX";
import ElkMapbox from "./ElkMapbox";
import AntelopeMapbox from "./AntelopeMapbox";
import BighornSheepMapbox from "./BighornSheepMapbox";
import BlackBearMapbox from "./BlackBearMapbox";
import MooseMapbox from "./MooseMapbox";
import MountainGoatMapbox from "./MountainGoatMapbox";
import MountainLionMapbox from "./MountainLionMapbox";
import MuleDeerMapbox from "./MuleDeerMapbox";
import TurkeyMapbox from "./TurkeyMapbox";
import UplandGameMapbox from "./UplandGameMapbox";
import WhitetailDeerMapbox from "./WhitetailDeerMapbox";
import WolfMapbox from "./WolfMapbox";


const Mapbox = observer(() => {
  const speciesState = mapboxStore.speciesState

  let componentToRender;
  switch (speciesState) {
    case "Antelope":
      console.log("antelope")
      componentToRender = <AntelopeMapbox />;
      break;
    case "Bighorn Sheep":
      componentToRender = <BighornSheepMapbox />;
      break;
    case "Black Bear":
      componentToRender = <BlackBearMapbox />;
      break;
    case "Elk":
      componentToRender = <ElkMapbox />;
      break;
    case "Moose":
      componentToRender = <MooseMapbox />;
      break;
    case "Mountain Goat":
      componentToRender = <MountainGoatMapbox />;
      break;
    case "Mountain Lion":
      componentToRender = <MountainLionMapbox />;
      break;
    case "Mule Deer":
      componentToRender = <MuleDeerMapbox />;
      break;
    case "Turkey":
      componentToRender = <TurkeyMapbox />;
      break;
    case "Upland Game":
      componentToRender = <UplandGameMapbox />;
      break;
    case "Whitetail Deer":
      componentToRender = <WhitetailDeerMapbox />;
      break;
    case "Wolf":
      componentToRender = <WolfMapbox />;
      break;
    default:
      componentToRender = <ElkMapbox />;

  }

  return (
    <div className="relative">
      <div className="absolute z-10 w-full">
        <FilterBar />
      </div>
      <div className="z-0">{componentToRender}</div>
    </div>
  )
});


export default Mapbox;
