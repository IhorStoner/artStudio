import React, { useContext } from 'react'
import './Homepage.scss'
import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom'
import Works from '../../components/Works/Works'
import Footer from '../../components/Footer/Footer'
import { AuthContext } from '../../context/AuthContext'
import AdminPanel from '../../components/AdminPanel/AdminPanel'
import { PictureOrder } from '../../components/PictureOrder/PictureOrder'

export default function Homepage({ adminPanel }) {
  const { nav } = useParams()
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <div className='homepage'>
      {adminPanel && <div>AdminPanel</div>}
      <Header />
      {nav === 'aboutUs' && <div>ABOUT US</div>}
      {nav === 'works' && <Works />}
      {isAuthenticated && nav === 'adminPanel' && <AdminPanel />}
      <Footer />
    </div>
  )
}
