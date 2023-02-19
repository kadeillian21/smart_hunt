import React, { useState } from "react";
import mapboxStore from "../../mapboxStoreMobX";

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

  const years = [
    2004,
    2005,
    2006,
    2007,
    2008,
    2009,
    2010,
    2011,
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
  ];

  // State
  const { speciesState, residencyState, startYearState, endYearState } = mapboxStore
  const { setSpeciesState, setResidencyState, setStartYearState, setEndYearState } = mapboxStore
  const [isSpeciesOpen, setIsSpeciesOpen] = useState(false);
  const [isResidencyOpen, setIsResidencyOpen] = useState(false);

  const handleSpeciesOptionClick = (option) => {
    setSpeciesState(option);
    setIsSpeciesOpen(false);
  };

  const handleResidencyOptionClick = (option) => {
    setResidencyState(option);
    setIsResidencyOpen(false);
  }

  const handleStartYearChange = (event) => {
    const selectedYear = parseInt(event.target.value);
    setStartYearState(selectedYear);
    if (selectedYear > endYearState) {
      setEndYearState(selectedYear);
    }
  };

  const handleEndYearChange = (event) => {
    const selectedYear = parseInt(event.target.value);
    console.log(selectedYear)
    setEndYearState(selectedYear);
    console.log(setEndYearState(selectedYear))
    if (selectedYear < startYearState) {
      setStartYearState(selectedYear);
    }
  };


  return (
    <div>
      <nav className="bg-white h-8">
        <div className="max-w-7xl mx-1 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mx-2">
                <button
                  onClick={() => setIsSpeciesOpen(!isSpeciesOpen)}
                  type="button"
                  className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  id="speciesOptions-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  {speciesState}
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 14l-5-5h10l-5 5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isSpeciesOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="speciesOption-menu"
                    >
                      {speciesOptions.map((speciesOption) => (
                        <button
                          key={speciesOption}
                          onClick={() => handleSpeciesOptionClick(speciesOption)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          {speciesOption}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative mx-2">
                <button
                  onClick={() => setIsResidencyOpen(!isResidencyOpen)}
                  type="button"
                  className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  {residencyState}
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 14l-5-5h10l-5 5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isResidencyOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {residencyOptions.map((residencyOption) => (
                        <button
                          key={residencyOption}
                          onClick={() => handleResidencyOptionClick(residencyOption)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          {residencyOption}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center mx-2">
                <label className="mr-2">Start Year:</label>
                <select
                  value={startYearState}
                  onChange={handleStartYearChange}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <label className="mx-2">End Year:</label>
                <select
                  value={endYearState}
                  onChange={handleEndYearChange}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  {years.slice(years.indexOf(startYearState)).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default FilterBar;
