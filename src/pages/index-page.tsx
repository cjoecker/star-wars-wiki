import { List, ListType } from '../components/list'
import { useState } from 'react'

type SelectorButtonProps = {
  label: string
  isSelected: boolean
  onClick: VoidFunction
}
const SelectorButton = ({ label, isSelected, onClick }: SelectorButtonProps) => {
  return (
    <button className={`rounded-xl flex-1 py-2 ${isSelected && 'bg-gray-700'}`} onClick={onClick}>
      {label}
    </button>
  )
}

export const IndexPage = () => {
  const [selectedList, setSelectedList] = useState<ListType>('people')
  const [searchText, setSearchText] = useState('')
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl bold mt-5 mb-10">Star Wars WIKI</h1>
      <div className="flex flex-col w-72 flex-0 mb-14 mt-2">
        <label htmlFor="search">Search</label>
        <input
          className="rounded-lg p-2"
          type="text"
          id="search"
          onChange={(event) => setSearchText(event.target.value)}
        />
      </div>
      <div className="rounded-xl bg-gray-900 w-[400px] flex mx-auto mb-6">
        <SelectorButton
          label="CHARACTERS"
          onClick={() => setSelectedList('people')}
          isSelected={selectedList.includes('people')}
        />
        <SelectorButton
          label="STARSHIPS"
          onClick={() => setSelectedList('starships')}
          isSelected={selectedList.includes('starships')}
        />
        <SelectorButton
          label="PLANETS"
          onClick={() => setSelectedList('planets')}
          isSelected={selectedList.includes('planets')}
        />
      </div>
      <List type={selectedList} searchText={searchText} />
    </div>
  )
}
