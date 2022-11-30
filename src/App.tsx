import './App.css'
import { List } from './components/list'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PeoplePage } from './components/people-page'
import { PlanetsPage } from './components/planets-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <List type={'people'} />,
  },
  {
    path: '/planets',
    element: <List type={'planets'} />,
  },
  {
    path: '/people/:peopleId',
    element: <PeoplePage />,
  },
  {
    path: '/planets/:planetId',
    element: <PlanetsPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
