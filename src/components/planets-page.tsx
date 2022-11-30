import { useQueries, useQuery } from '@tanstack/react-query'
import { BASE_URL } from '../constants/api'
import * as React from 'react'
import { useParams } from 'react-router-dom'
import { People, Planet, Starship } from '../types/api'
import { HomeButton } from './home-button'
import { Loading } from './loading'
import { Error } from './error'
import { addId, getIdFromUrl } from '../utils/getIdFromUrl'
import { ProfileEntry } from './profile-entry'

export const PlanetsPage = () => {
  let { planetId } = useParams()

    console.log('comp2', ['planets', planetId]);
  const { isLoading, error, data } = useQuery<Planet>({
    queryKey: ['planets', planetId],
    queryFn: () => fetch(`${BASE_URL}/planets/${planetId}`).then((res) => res.json()),
  })

  if (error) {
    return <Error error={error} />
  }

  return (
    <>
      <HomeButton />
      <div className="flex flex-col items-center">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h1 className="text-4xl bold my-4 underline">{data?.name}</h1>
            <div className="grid grid-cols-3 gap-12 mt-6">
              <ProfileEntry label="Climate" value={data?.climate} />
              <ProfileEntry label="Terrain" value={data?.terrain} />
              <ProfileEntry label="Diameter" value={data?.diameter} />
              <ProfileEntry label="Gravity" value={data?.gravity} />
              <ProfileEntry label="Orbital period" value={data?.orbital_period} />
              <ProfileEntry label="Population" value={data?.population} />
            </div>
          </>
        )}
      </div>
    </>
  )
}
