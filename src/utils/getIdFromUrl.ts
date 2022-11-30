import invariant from 'tiny-invariant'

export function getIdFromUrl(url: string | undefined): string {
  if (!url) return ''
  const idMatch = url.match(/^.*\/(.*)\/$/)
  invariant(idMatch?.[1], `id not found in url ${url}`)
  return idMatch[1]
}

export function addId(object: Record<string, any>) {
  invariant('url' in object, `object has no url to get id from: ${object}`)
  return { id: getIdFromUrl(object.url), ...object }
}
