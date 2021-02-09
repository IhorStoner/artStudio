import React from 'react'
import './Homepage.scss'
import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom'
import Works from '../../components/Works/Works'
import NewPictureForm from '../../components/NewPictureForm/NewPictureForm'

export default function Homepage({ adminPanel }) {
  const {nav} = useParams()

  return (
    <div className='homepage'>
      {adminPanel && <div>AdminPanel</div>}
      <Header/>
      {nav === 'aboutUs' && <NewPictureForm/>}
      {nav === 'works' && <Works />}
    </div>
  )
}
