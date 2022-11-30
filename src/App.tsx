import './App.css'
import { List } from './components/list'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <List type={'people'} />,
  },
  {
    path: '/planets',
    element: <List type={'planets'} />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
