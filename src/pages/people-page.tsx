import { useQueries } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { People, Planet, Starship } from '../types/api'
import { HomeButton } from '../components/home-button'
import { Loading } from '../components/loading'
import { Error } from '../components/error'
import { useStarWarsQuery, getItem, parseUrlId } from '../utils/api'
import { LinkButton } from '../components/link-button'
import { ProfileEntry } from '../components/profile-entry'

type HomeworldsProps = {
  id: string | undefined
}

export function Homeworlds({ id }: HomeworldsProps) {
  const { isLoading, error, data } = useStarWarsQuery<Planet>('planets', id)

  if (error) {
    return <Error error={error} />
  }

  return (
    <div className="col-span-1 flex-col">
      <h2 className="font-bold">Homeworld</h2>
      {isLoading ? <Loading /> : <LinkButton label={data?.name} url={`/planets/${id}`} />}
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
          queryFn: () => getItem<Starship>(id, 'starships'),
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
            <LinkButton
              key={starship.data?.id}
              label={starship.data?.name}
              url={`/starships/${starship.data?.id}`}
            />
          )
        })
      ) : (
        <div>None</div>
      )}
    </div>
  )
}

export const PeoplePage = () => {
  const { peopleId } = useParams()
  const { isLoading, error, data } = useStarWarsQuery<People>('people', peopleId)

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
