import React, { useContext, useEffect } from 'react'
import './Homepage.scss'
import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom'
import Works from '../../components/Works/Works'
import Footer from '../../components/Footer/Footer'
import { AuthContext } from '../../context/AuthContext'
import AdminPanel from '../../components/AdminPanel/AdminPanel'
import { OrderForm } from '../../components/OrderForm/OrderForm'
import { fetchTypesOfClothing } from '../../redux/action/picturesAction'
import { useDispatch } from 'react-redux'

export default function Homepage({ adminPanel }) {
  const { nav } = useParams()
  const { isAuthenticated } = useContext(AuthContext)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTypesOfClothing())
  }, [])


  return (
    <div className='homepage'>
      {adminPanel && <div>AdminPanel</div>}
      <Header />
      {nav === 'aboutUs' && <div>ABOUT US</div>}
      {nav === 'works' && <Works />}
      {nav === 'orderForm' && <OrderForm />}
      {isAuthenticated && nav === 'adminPanel' && <AdminPanel />}
      <Footer />
    </div>
  )
}
