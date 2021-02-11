import React from 'react'
import { Redirect, Route, Switch, BrowserRouter as Router } from "react-router-dom"
import AdminAuthPage from './pages/AdminAuthPage/AdminAuthPage'
import Homepage from './pages/Homepage/Homepage'
import OpenPicturePage from './pages/OpenPicturePage/OpenPicturePage'

export default function Routes() {

  return (
    <Router>
      <Switch>
        <Route path="/home/admin">
          <AdminAuthPage/>
        </Route>
        <Route path="/home/works/:pictureId">
          <OpenPicturePage />
        </Route>
        <Route path="/home/:nav">
          <Homepage />
        </Route>
        <Redirect to='/home/aboutUs'/>
      </Switch>
    </Router>
  )
}
