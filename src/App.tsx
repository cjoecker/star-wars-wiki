import './App.css'
import { List } from './components/list'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import {People} from "./components/people";

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
    element: <People />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
