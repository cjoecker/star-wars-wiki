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

export const StarshipsPage = () => {
  let { starshipId } = useParams()

  const { isLoading, error, data } = useQuery<Starship>({
    queryKey: ['starships', starshipId],
    queryFn: () => fetch(`${BASE_URL}/starships/${starshipId}`).then((res) => res.json()),
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
              <ProfileEntry label="Consumables" value={data?.consumables} />
              <ProfileEntry label="Crew" value={data?.crew} />
              <ProfileEntry label="Hyperdrive rating" value={data?.hyperdrive_rating} />
              <ProfileEntry label="Manufacturer" value={data?.manufacturer} />
              <ProfileEntry label="Model" value={data?.model} />
              <ProfileEntry label="Name" value={data?.name} />
            </div>
          </>
        )}
      </div>
    </>
  )
}
