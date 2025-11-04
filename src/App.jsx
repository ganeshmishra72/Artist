import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './auth/Login'
import Signup from './auth/Signup'
import 'remixicon/fonts/remixicon.css'
import swal from 'sweetalert'
import 'animate.css'
import Preguard from './guard/PreGuard'

import Home from './components/Home'
import Explore from './components/Explore'
import Artist from './components/Artist'
import Contact from './components/Contact'
import Layout from './Admin/Layout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Preguard />} >
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/artist' element={<Artist />} />
        <Route path='/contact' element={<Contact />} />

        <Route path='admin' element={<Layout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
