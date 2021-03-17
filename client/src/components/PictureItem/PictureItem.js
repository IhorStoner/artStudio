import React from 'react'
import './PictureItem.scss'
import ItemsSlider from './ItemsSlider/ItemsSlider'

export default function PictureItem({ picture, className, handleOpeningPicture }) {

  return (
    <div className={`picture ${className}`}>
      <div className="picture__slider">
        <ItemsSlider imgArr={picture.images} />
      </div>
      <span className="picture__text" title='открыть в новом окне'>
        {picture.text}
      </span>
      <div className="picture__footer">
        <p className="picture__price">{picture.price} грн</p>
        <button className="picture__btn" onClick={(e) => handleOpeningPicture(picture._id)}>
          Заказать
          </button>
      </div>
    </div >
  )
}
