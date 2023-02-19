import { makeAutoObservable } from 'mobx';

class MapboxStore {
  speciesState = 'Black Bear';
  residencyState = 'All Residency';
  startYearState = 2020
  endYearState = 2021

  constructor() {
    makeAutoObservable(this);
  }

  setSpeciesState = (species: string) => {
    this.speciesState = species;
  }

  setResidencyState = (residency: string) => {
    this.residencyState = residency;
  }

  setStartYearState = (startYear: number) => {
    this.startYearState = startYear;
  }

  setEndYearState = (endYear: number) => {
    this.endYearState = endYear;
  }
}

const mapboxStore = new MapboxStore();

export default mapboxStore;
