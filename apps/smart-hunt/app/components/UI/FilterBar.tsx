import React, { useEffect, useState } from "react";
import mapboxStore from "../../mapboxStoreMobX";
import Dropdown from "react-dropdown";
import { observer } from "mobx-react-lite";

function FilterBar() {
  const speciesOptions = [
    "Antelope",
    "Black Bear",
    "Elk",
    "Moose",
    "Mule Deer",
    "Mountain Goat",
    "Mountain Lion",
    "Bighorn Sheep",
    "Turkey",
    "Upland Game",
    "Whitetail Deer",
    "Wolf",
  ];

  const residencyOptions = [
    "Resident",
    "Non-Resident",
    "All Residencies",
  ]

  const yearsOptions = [
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
  ];

  // State
  const { speciesState, residencyState, yearState } = mapboxStore
  const { setSpeciesState, setResidencyState, setYearState } = mapboxStore
  const [isSpeciesOpen, setIsSpeciesOpen] = useState(false);
  const [isResidencyOpen, setIsResidencyOpen] = useState(false);

  const handleSpeciesOptionClick = (option) => {
    setSpeciesState(option);
    setIsSpeciesOpen(false);
    console.log(speciesState)
  };

  const handleResidencyOptionClick = (option) => {
    setResidencyState(option);
    setIsResidencyOpen(false);
  }

  const handleYearOptionClick = (option) => {
    setYearState(option);
    setIsSpeciesOpen(false);
  }

  return (
    <div>
      <nav className="bg-white h-8">
        <div className="max-w-7xl mx-1 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-top">
              Species:
              <div className="relative mx-2">
                <Dropdown
                  options={speciesOptions}
                  value={speciesState}
                  onChange={handleSpeciesOptionClick}
                  className="inline-flex justify-center items-centtoper w-full rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                />
              </div>
              Residency:
              <div className="relative mx-2">
                <Dropdown
                  options={residencyOptions}
                  value={residencyState}
                  onChange={handleResidencyOptionClick}
                  className="inline-flex justify-center items-top w-full rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                />
              </div>
              Year:
              <div className="relative mx-2">
                <Dropdown
                  options={yearsOptions}
                  value={yearState}
                  onChange={handleYearOptionClick}
                  className="inline-flex justify-center items-top w-full rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default FilterBar;
