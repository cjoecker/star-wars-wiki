import { IPeople, IPlanet, IStarship } from 'swapi-ts'

export type IdProp = { id: string }
export type People = IPeople & IdProp
export type Starship = IStarship & IdProp
export type Planet = IPlanet & IdProp
