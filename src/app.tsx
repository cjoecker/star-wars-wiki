import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PeoplePage } from './pages/people-page'
import { PlanetsPage } from './pages/planets-page'
import { StarshipsPage } from './pages/starships-page'
import { IndexPage } from './pages/index-page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <IndexPage />,
  },
  {
    path: '/people/:peopleId',
    element: <PeoplePage />,
  },
  {
    path: '/planets/:planetId',
    element: <PlanetsPage />,
  },
  {
    path: '/starships/:starshipId',
    element: <StarshipsPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
