// import { useState } from 'react'
import './App.css';
import User from './components/User';
import Add from './components/Add';
import Edit from './components/Edit';
import { createBrowserRouter , Route , Router, RouterProvider} from 'react-router-dom'

function App() {

  const route = createBrowserRouter([
    {
      path:"/",
      element: <User />,
    },
    {
      path:"/add",
      element: <Add />,
    },
    {
      path:"/edit/:id",
      element: <Edit />,
    },
  ])

  return (
    <>
      <div className="App">
        <h1>Curd Application</h1>
        <RouterProvider router={route}></RouterProvider>
      </div>
    </>
  )
}

export default App
