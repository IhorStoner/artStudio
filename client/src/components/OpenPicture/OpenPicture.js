import React from 'react'
import './OpenPicture.scss'
import OpenPictureSlider from '../OpenPictureSlider/OpenPictureSlider'

export default function OpenPicture({ picture }) {

  return (
    <div className='container'>
      <div className="openPicture">
        <h2 className="openPicture__title">{picture.title}</h2>
        <div className="openPicture__slider">
          {picture.images && <OpenPictureSlider imgArr={picture.images} thumbs={true}/>}
        </div>
        <p className='openPicture__description'>{picture.text}</p>
        <div className="openPicture__priceContainer">
          <div className="openPicture__price">
            <span>Цена:</span>
            <span>{picture.price}</span>
          </div>
          <button className='openPicture__btn'>Заказать</button>
        </div>
      </div>
    </div>
  )
}
