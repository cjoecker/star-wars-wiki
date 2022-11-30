export type People = {
  id: string
  birth_year: string
  eye_color: string
  films: string[]
  gender: string
  hair_color: string
  height: string
  homeworld: string
  mass: string
  name: string
  skin_color: string
  created: Date
  edited: Date
  species: string[]
  starships: string[]
  url: string
  vehicles: string[]
}
export type Starship = {
  id: string
  MGLT: string
  cargo_capacity: string
  consumables: string
  cost_in_credits: string
  created: Date
  crew: string
  edited: Date
  hyperdrive_rating: string
  length: string
  manufacturer: string
  max_atmosphering_speed: string
  model: string
  name: string
  passengers: string
  films: string[]
  pilots: string[]
  starship_class: string
  url: string
}
export type Planet = {
  id: string
  climate: string
  created: Date
  diameter: string
  edited: Date
  films: string[]
  gravity: string
  name: string
  orbital_period: string
  population: string
  residents: string[]
  rotation_period: string
  surface_water: string
  terrain: string
  url: string
}
