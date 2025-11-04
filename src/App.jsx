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
import Art from './Admin/Art'
import AdminArtist from './Admin/AdminArtist'
import Setting from './Admin/Setting'
import Orders from './Admin/Orders'
import Contact from './components/Contact'

import Dashboard from './Admin/Dashboard'

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


        <Route path='/admin' >
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='arts' element={<Art />} />
          <Route path='adminartist' element={<AdminArtist />} />
          <Route path='setting' element={<Setting />} />
          <Route path='orders' element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
