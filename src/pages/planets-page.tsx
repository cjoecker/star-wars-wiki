import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '../constants/api'
import { useParams } from 'react-router-dom'
import { Planet } from '../types/api'
import { HomeButton } from '../components/home-button'
import { Loading } from '../components/loading'
import { Error } from '../components/error'
import { ProfileEntry } from '../components/profile-entry'

export const PlanetsPage = () => {
  const { planetId } = useParams()

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
            <div className="grid grid-cols-3 gap-12 mt-6 max-w-3xl">
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
