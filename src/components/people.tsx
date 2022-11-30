import {useQueries, useQuery} from '@tanstack/react-query'
import {IPeople, IStarship} from 'swapi-ts'
import { BASE_URL } from '../constants/api'
import { useState } from 'react'
import * as React from 'react'
import {useParams} from "react-router-dom";

export const People = () => {
    let { peopleId } = useParams();
  const { isLoading, error, data } = useQuery<IPeople>({
    queryKey: ['people',peopleId],
    queryFn: () =>
      fetch(`${BASE_URL}/people/${peopleId}`)
        .then((res) => res.json()),
  })


    const starships = useQueries<IStarship[]>({
        queries: data?.starships.map(starship => {
            return {
                queryKey: ['starships', starship],
                queryFn: () => fetch(starship as string)
                    .then((res) => res.json()),
            }
        }) ?? []
    })

    return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl bold my-4 underline">{data?.name}</h1>
        <div className="grid grid-cols-3 gap-12 mt-6">
            <ProfileEntry label="Height (cm)" value={data?.height}/>
            <ProfileEntry label="Birth year" value={data?.birth_year}/>
            <ProfileEntry label="Gender" value={data?.gender}/>
            <ProfileEntry label="Hair color" value={data?.hair_color}/>
            <ProfileEntry label="Mass" value={data?.mass}/>
            <ProfileEntry label="Skin color" value={data?.skin_color}/>
            <div className="col-span-3 flex flex-col">
                <h2 className="font-bold">Starships</h2>
                {starships.map(starship=>{
                    return <a className="text-3xl mb-3 underline hover:text-blue-200 cursor-pointer" href={starship?.data?.url}>{starship?.data?.name}</a>
                })}
            </div>

        </div>
    </div>
  )
}


export type ProfileEntryProps = {
    label: string
    value?: string
};
export const ProfileEntry = ({label,value}: ProfileEntryProps) => {
    return (
        <div className="col-span-1 flex-col">
            <h2 className="font-bold">
                {label}
            </h2>
            <div className="text-3xl capitalize">
                {value ?? 'Undefined'}
            </div>
        </div>
    );
};
