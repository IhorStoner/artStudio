import React, { useState, useEffect } from 'react'
import Button from '../Button/Button'
import PictureItem from '../PictureItem/PictureItem'
import { fetchPictures } from '../../redux/action/picturesAction'
import { useDispatch, useSelector } from 'react-redux'
import { getPictures } from '../../redux/selector/picturesSelector'
import './Works.scss'

export default function Works() {
  const [activeItem, setActiveItem] = useState('oil')
  const dispatch = useDispatch()
  const pictures = useSelector(getPictures)

  useEffect(() => {
    dispatch(fetchPictures(activeItem))
  }, [activeItem])

  return (
    <div className='works'>
      <div className="works__btns">
        <Button text={'Штаны'} active={activeItem === 'trousers'} onClick={() => setActiveItem('trousers')} />
        <Button text={'Футболки'} active={activeItem === 't-shirts'} onClick={() => setActiveItem('t-shirts')} />
        <Button text={'Куртки'} active={activeItem === 'jackets'} onClick={() => setActiveItem('jackets')} />
        <Button text={'Комбинизоны'} active={activeItem === 'jumpsuits'} onClick={() => setActiveItem('jumpsuits')} />
      </div>
      <div className="works__content">
        {
          pictures && pictures.map((picture, index) => (
            <PictureItem key={index} className='works__item' picture={picture} />
          ))
        }
      </div>
    </div>
  )
}
