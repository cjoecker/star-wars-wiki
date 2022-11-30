import './App.css'
import { List } from './components/list'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import {PeoplePage} from "./components/people-page";

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
])

function App() {
  return <RouterProvider router={router} />
}

export default App
