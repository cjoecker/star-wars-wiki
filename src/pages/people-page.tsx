import { useQueries, useQuery } from '@tanstack/react-query'
import { BASE_URL } from '../constants/api'
import { useParams } from 'react-router-dom'
import {People, Planet, Starship} from '../types/api'
import { HomeButton } from '../components/home-button'
import { Loading } from '../components/loading'
import { Error } from '../components/error'
import { addId, parseUrlId } from '../utils/parse-url-id'

type HomeworldsProps = {
  id: string | undefined
}

export function Homeworlds({ id }: HomeworldsProps) {
  const { isLoading, error, data } = useQuery<Planet>({
    queryKey: ['planets', id],
    queryFn: () => fetch(`${BASE_URL}/planets/${id}`).then((res) => res.json()),
    enabled: !!id,
  })

  if (error) {
    return <Error error={error} />
  }

  return (
    <div className="col-span-1 flex-col">
      <h2 className="font-bold">Homeworld</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <a
          className="text-3xl underline hover:text-blue-200 cursor-pointer"
          href={`/planets/${id}`}
        >
          {data?.name}
        </a>
      )}
    </div>
  )
}

type StarshipsProps = {
  ids: string[] | undefined
}

export function Starships({ ids }: StarshipsProps) {
  const starships = useQueries({
    queries:
      ids?.map((id) => {
        return {
          queryKey: ['starships', id],
          queryFn: () =>
            fetch(`${BASE_URL}/starships/${id}`)
              .then((res) => res.json())
              .then((res) => addId(res) as Starship),
          enabled: !!ids,
        }
      }) ?? [],
  })

  if (starships.some((starship) => starship.error)) {
    return <Error error={starships.filter((starship) => starship.error)} />
  }

  return (
    <div className="col-span-3 flex flex-col">
      <h2 className="font-bold">Starships</h2>
      {starships.length > 0 ? (
        starships.map((starship) => {
          return starship.isLoading ? (
            <Loading />
          ) : (
            <a
              key={starship.data?.id}
              className="text-3xl underline hover:text-blue-200 cursor-pointer"
              href={`/starships/${starship.data?.id}`}
            >
              {starship.data?.name}
            </a>
          )
        })
      ) : (
        <div>None</div>
      )}
    </div>
  )
}

export type ProfileEntryProps = {
  label: string
  value?: string
}
export const ProfileEntry = ({ label, value }: ProfileEntryProps) => {
  return (
    <div className="col-span-1 flex-col">
      <h2 className="font-bold">{label}</h2>
      <div className="text-3xl capitalize">{value ?? 'Undefined'}</div>
    </div>
  )
}

export const PeoplePage = () => {
  const { peopleId } = useParams()
  const { isLoading, error, data } = useQuery<People>({
    queryKey: ['people', peopleId],
    queryFn: () => fetch(`${BASE_URL}/people/${peopleId}`).then((res) => res.json()),
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
              <ProfileEntry label="Height (cm)" value={data?.height} />
              <ProfileEntry label="Birth year" value={data?.birth_year} />
              <ProfileEntry label="Gender" value={data?.gender} />
              <ProfileEntry label="Hair color" value={data?.hair_color} />
              <ProfileEntry label="Mass" value={data?.mass} />
              <ProfileEntry label="Skin color" value={data?.skin_color} />
              <Homeworlds id={parseUrlId(data?.url)} />
              <Starships ids={data?.starships.map((starship) => parseUrlId(starship))} />
            </div>
          </>
        )}
      </div>
    </>
  )
}
