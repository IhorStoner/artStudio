import React from 'react'
import './PictureItem.scss'
import ItemSlider from '../ItemSlider/ItemSlider'

export default function PictureItem({picture,className}) {
  return (
    <div className={`picture ${className}`}>
      <div className="picture__slider">
        <ItemSlider imgArr={picture.images}/>
      </div>
      <div className="picture__text">
        {picture.text}
      </div>
      <div className="picture__footer">
        <p className="picture__price">{picture.price} грн</p>
        <button>Заказать</button>
      </div>
    </div>
  )
}
