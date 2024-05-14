import React from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Home } from '../pages/home'
import { Adduser } from '../pages/addUser'
import { Edituser } from '../pages/editUser'

export const Router = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/adduser" element={<Adduser />} />
    <Route path="/edituser/:id" element={<Edituser />} />
   </Routes>
   </BrowserRouter>
   </>
  )
}
