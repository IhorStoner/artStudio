import React from 'react'
import './PictureItem.scss'
import ItemSlider from '../ItemSlider/ItemSlider'
import {Link} from 'react-router-dom'

export default function PictureItem({picture,className}) {
  const handleBtnOrder = () => {

  }

  return (
    <div className={`picture ${className}`}>
      <div className="picture__slider">
        <ItemSlider imgArr={picture.images}/>
      </div>
      <Link to={`/home/works/${picture._id}`} className="picture__text" title='открыть в новом окне'>
        {picture.text}
      </Link>
      <div className="picture__footer">
        <p className="picture__price">{picture.price} грн</p>
        <button className="picture__btn" onMouseDown={{backgroundColor: 'red'}} onClick={(e) => handleBtnOrder(e)}>Заказать</button>
      </div>
    </div>
  )
}
