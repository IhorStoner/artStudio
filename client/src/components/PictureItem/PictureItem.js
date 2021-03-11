import React from 'react'
import './PictureItem.scss'
import ItemSlider from '../ItemSlider/ItemSlider'
import { Link, useHistory } from 'react-router-dom'

export default function PictureItem({ picture, className }) {
  const handleBtnOrder = () => {

  }

  const { push } = useHistory()

  return (
    <div className={`picture ${className}`}>
      <div className="picture__slider">
        <ItemSlider imgArr={picture.images} />
      </div>
      <Link to={`/home/works/${picture._id}`} className="picture__text" title='открыть в новом окне'>
        {picture.text}
      </Link>
      <div className="picture__footer">
        <p className="picture__price">{picture.price} грн</p>
        <button className="picture__btn" onClick={(e) => push(`/home/works/${picture._id}`)}>
          {/* <button className="picture__btn" onMouseDown={{ backgroundColor: 'red' }} onClick={(e) => push(`/home/works/${picture._id}`)}> //не понятный  onMouseDown ??? */}
          Заказать
          </button>
      </div>
    </div>
  )
}
