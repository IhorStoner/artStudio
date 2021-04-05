import React, { useContext, useEffect, useState } from 'react'
import './Homepage.scss'
import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom'
import Works from '../../components/Works/Works'
import Footer from '../../components/Footer/Footer'
import About from '../AboutPage/About';
import Delivery from '../Delivery/Delivery';
import Return from '../ReturnPage/Return';
import Contact from '../ContactPage/Contact';
import { AuthContext } from '../../context/AuthContext'
import AdminPanel from '../../components/AdminPanel/AdminPanel'
import { OrderForm } from '../../components/OrderForm/OrderForm'
import { fetchTypesOfClothing } from '../../redux/action/picturesAction'
import { useDispatch } from 'react-redux'

export default function Homepage({ adminPanel }) {
  const { nav } = useParams()
  const { isAuthenticated } = useContext(AuthContext)
  const dispatch = useDispatch()
  const [picturePage, setPicturePage] = useState(false)

  useEffect(() => {
    dispatch(fetchTypesOfClothing())
  }, [])

  console.log(nav)
  return (
    <div className='homepage'>
      <Header picturePage={picturePage} setPicturePage={setPicturePage} />
      {nav === 'aboutUs' && <About />}
      {nav === 'works' && <Works picturePage={picturePage} setPicturePage={setPicturePage} />}
      {nav === 'orderForm' && <OrderForm />}
      {nav === "return" && <Return/>}
      {nav === "delivery" && <Delivery/>}
      {/* {nav === "contact" && <Contact/>} */}
      {isAuthenticated && nav === 'adminPanel' && <AdminPanel />}
      <Footer />
    </div>
  )
}
