import { makeAutoObservable } from 'mobx';

class MapboxStore {
  speciesState = 'Elk';
  residencyState = 'All Residency';
  yearState = "2021"

  constructor() {
    makeAutoObservable(this);
  }

  setSpeciesState = (species: string) => {
    this.speciesState = species;
  }

  setResidencyState = (residency: string) => {
    this.residencyState = residency;
  }

  setYearState = (year: string) => {
    this.yearState = year;
  }

}

const mapboxStore = new MapboxStore();

export default mapboxStore;
