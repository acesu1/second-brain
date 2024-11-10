import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './routes/layout'
import { Dashboard } from './routes/dashboard'

export const router = createBrowserRouter([{
  path: '/',
  element: <Layout />,
  children: [
    {
      path: '/',
      element: <Dashboard />,
    },
  ],
}])
