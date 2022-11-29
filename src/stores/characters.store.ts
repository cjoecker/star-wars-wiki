import create from 'zustand'
import {useQuery, UseQueryResult} from '@tanstack/react-query'

type StarWarsStore = {
    characters: any[]
}

export const useStarWarsStore = create<StarWarsStore>((set) => ({
  characters: [],
}))
