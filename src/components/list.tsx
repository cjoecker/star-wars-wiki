import * as React from 'react'
import likeIconFilled from '../assets/like-icon-filled.svg'
import likeIconEmpty from '../assets/like-icon-empty.svg'
import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '../constants/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { People, Planet, Starship } from '../types/api'
import { addId } from '../utils/getIdFromUrl'
import {IPeople} from "swapi-ts";

type ListType = 'people' | 'starships' | 'planets'

type ListProps = {
  type: ListType
}

export const List = ({ type }: ListProps) => {
  const { isLoading, error, data } = useQuery<People[]>({
    queryKey: [type],
    queryFn: () =>
      fetch(`${BASE_URL}/${type}`)
        .then((res) => res.json())
        .then((res) => res?.results.map((result: IPeople) => addId(result))),
    staleTime: 50000000,
  })
  const [favorites, setFavorites] = useState<People['name'][]>([])
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()

  const handleFavouriteClick = (name: People['name']) => {
    if (favorites.includes(name)) {
      setFavorites((prevNames) => prevNames.filter((prevName) => prevName !== name))
    } else {
      setFavorites((prevNames) => [...prevNames, name])
    }
  }

  const filteredItems = data?.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <div className="flex flex-col mx-auto items-center gap-3">
      <div className="flex flex-col w-72 flex-0 mb-4 mt-2">
        <label htmlFor="search">Search</label>
        <input
          className="rounded-lg p-2"
          type="text"
          id="search"
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>
      {filteredItems?.map((item) => {
        return (
          <ListItem
            key={item.id}
            name={item.name}
            isFavourite={favorites.includes(item.name)}
            onFavouriteClick={handleFavouriteClick}
            onClickMoreInformation={() => navigate(`/${type}/${item.id}`)}
          />
        )
      })}
    </div>
  )
}

type ListItemProps = {
  name: string
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
    <div className="p-2 bg-gray-900 rounded-xl flex w-[500px]">
      <div className="text-lg mx-4 my-auto flex-1">{name}</div>
      <div className="flex">
        <button
          className="rounded-xl bg-gray-800 py-2 px-4 hover:bg-gray-700"
          onClick={onClickMoreInformation}
        >
          MORE INFORMATION
        </button>
        <button
          className="my-auto h-full ml-4"
          onClick={() => onFavouriteClick(name)}
          aria-label={isFavourite ? 'not favourite anymore' : 'favourite'}
        >
          <img width="48px" height="48px" className="w-8 h-8 my-auto" alt="heart" src={isFavourite ? likeIconFilled : likeIconEmpty} />
        </button>
      </div>
    </div>
  )
}
