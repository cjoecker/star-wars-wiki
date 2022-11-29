import './App.css'
import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './constants/api'
import { IPeople } from 'swapi-ts'

import likeIconFilled from './assets/like-icon-filled.svg'
import likeIconEmpty from './assets/like-icon-empty.svg'
import { useState } from 'react'
import { ListItem } from './components/list-item'

function App() {
  // const { isLoading, error, data } =  useQuery({
  //     queryKey: ['characters', 'all'],
  //     queryFn: () => fetch(`${BASE_URL}/people`).then(res =>
  //         res.json()
  //     ),
  // })
  const { isLoading, error, data } = useQuery<IPeople[]>({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch(`${BASE_URL}/people`)
        .then((res) => res.json())
        .then((data) => data?.results),
  })
  const [favoritesName, setFavoritesName] = useState<IPeople['name'][]>([])

  const handleFavouriteClick = (name: IPeople['name']) => {
    if (favoritesName.includes(name)) {
      setFavoritesName((prevNames) => prevNames.filter((prevName) => prevName !== name))
    } else {
      setFavoritesName((prevNames) => [...prevNames, name])
    }
  }

  return (
    <h1 className="text-3xl font-bold">
      {data?.map((character) => {
        return (
          <ListItem
            name={character.name}
            isFavourite={favoritesName.includes(character.name)}
            onFavouriteClick={handleFavouriteClick}
          />
        )
      })}
    </h1>
  )
}

export default App
