import likeIconFilled from '../assets/like-icon-filled.svg'
import likeIconEmpty from '../assets/like-icon-empty.svg'
import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '../constants/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { People, Planet, Starship } from '../types/api'
import { addId } from '../utils/parse-url-id'
import { Error } from './error'
import { Loading } from './loading'
import { motion } from 'framer-motion'

export type ListType = 'people' | 'starships' | 'planets'

type ListItemProps = {
  name: People['name'] | Starship['name'] | Planet['name']
  onClickMoreInformation: VoidFunction
  isFavourite: boolean
  onFavouriteClick: (name: People['name']) => void
}
const ListItem = ({
  name,
  onClickMoreInformation,
  isFavourite,
  onFavouriteClick,
}: ListItemProps) => {
  return (
    <motion.div layout className="p-2 bg-gray-900 rounded-xl flex w-[450px]">
      <div className="text-lg mx-4 my-auto flex-1">{name}</div>
      <div className="flex">
        <button
          className="rounded-xl bg-gray-700 py-2 px-4 hover:bg-gray-800"
          onClick={onClickMoreInformation}
        >
          SEE MORE
        </button>
        <button
          className="my-auto h-full ml-4"
          onClick={() => onFavouriteClick(name)}
          aria-label={isFavourite ? 'not favourite anymore' : 'favourite'}
        >
          <img
            width="48px"
            height="48px"
            className="w-8 h-8 my-auto"
            alt="heart"
            src={isFavourite ? likeIconFilled : likeIconEmpty}
          />
        </button>
      </div>
    </motion.div>
  )
}

type ListProps = {
  type: ListType
  searchText: string
}

export const List = ({ type, searchText }: ListProps) => {
  const { isLoading, error, data } = useQuery<People[]>({
    queryKey: [type],
    queryFn: () =>
      fetch(`${BASE_URL}/${type}`)
        .then((res) => res.json())
        .then((res) => res?.results.map((result: People | Starship | Planet) => addId(result))),
  })
  const [favorites, setFavorites] = useState<string[]>([])
  const navigate = useNavigate()

  const handleFavouriteClick = (name: string) => {
    if (favorites.includes(name)) {
      setFavorites((prevNames) => prevNames.filter((prevName) => prevName !== name))
    } else {
      setFavorites((prevNames) => [...prevNames, name])
    }
  }

  const filteredItems = data?.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  )

  const sortedItems = filteredItems?.sort((x, y) => {
    return Number(favorites.includes(y.name)) - Number(favorites.includes(x.name))
  })

  if (error) {
    return <Error error={error} />
  }

  return (
    <div className="flex flex-col mx-auto items-center gap-3">
      {isLoading ? (
        <Loading />
      ) : (
        sortedItems?.map((item) => {
          return (
            <ListItem
              key={item.name}
              name={item.name}
              isFavourite={favorites.includes(item.name)}
              onFavouriteClick={handleFavouriteClick}
              onClickMoreInformation={() => navigate(`/${type}/${item.id}`)}
            />
          )
        })
      )}
    </div>
  )
}
