import { People, Planet, Starship } from '../types/api'
import { useQuery } from '@tanstack/react-query'
import invariant from 'tiny-invariant'

export const BASE_URL = 'https://swapi.dev/api'

export type ResourceType = 'people' | 'starships' | 'planets'

export function parseUrlId(url: string | undefined): string {
  if (!url) return ''
  const idMatch = url.match(/^.*\/(.*)\/$/)
  invariant(idMatch?.[1], `id not found in url ${url}`)
  return idMatch[1]
}

export function addId(object: Starship | People | Planet) {
  invariant('url' in object, `object has no url to get id from: ${object}`)
  return { ...object, id: parseUrlId(object.url) }
}

export function getItem<T>(id: string | undefined, type: ResourceType): Promise<T> {
    return fetch(`${BASE_URL}/${type}/${id}`)
        .then((res) => res.json())
        .then((res) => addId(res) as T)
}

export function getItems<T>(type: ResourceType): Promise<T> {
    return fetch(`${BASE_URL}/${type}`)
        .then((res) => res.json())
        .then((res) => res?.results.map((result: Starship | People | Planet) => addId(result) as T))
}

export function useStarWarsQuery<T>(type: ResourceType, id: string | undefined) {
  return useQuery<T>({
    queryKey: [type, id],
    queryFn: () => getItem<T>(id, type),
    enabled: !!id,
  })
}
