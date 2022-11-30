import invariant from 'tiny-invariant'
import { People, Planet, Starship } from '../types/api'

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
