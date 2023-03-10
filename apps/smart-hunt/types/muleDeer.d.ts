export interface MuleDeer {
  license_year: number,
  district: string,
  deer_species: string,
  residency: string,
  hunters: number,
  days: number,
  days_per_hunter: number,
  total_harvest: number,
  bucks: number,
  does: number,
  fawns: number,
  bow: number,
  rifle: number,
  less_than_four_points: number,
  four_or_more_points: number,
  location: string,
  district_square_mileage: number,
  public_land_percentage: number,
  four_or_more_points_percentage: number,
  harvested_bucks_per_square_mile: number,
  harvested_does_per_square_mile: number,
  harvested_fawns_per_square_mile: number,
  harvested_less_than_four_points_bucks_per_square_mile: number,
  harvested_four_or_more_points_bucks_per_square_mile: number,
  total_harvest_per_square_mile: number,
}
