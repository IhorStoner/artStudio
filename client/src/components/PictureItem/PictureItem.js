import React from 'react'
import './PictureItem.scss'
import ItemsSlider from './ItemsSlider/ItemsSlider'

export default function PictureItem({ picture, className, handleOpeningPicture }) {
  const { _id, title, price } = picture
  return (
    <div className={`picture ${className}`}>
      <div className="picture__slider">
        <ItemsSlider imgArr={picture.images}  />
      </div>
      <span className="picture__title" title='открыть в новом окне'>
        {title}
      </span>
      <div className="picture__footer">
        <p className="picture__price">{price} грн</p>
        <button className="picture__btn" onClick={(e) => handleOpeningPicture(_id)}>
          Подробнее
        </button>
      </div>
    </div >
  )
}
