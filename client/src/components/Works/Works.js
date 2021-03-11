import React, { useState, useEffect } from 'react'
import Button from '../Button/Button'
import PictureItem from '../PictureItem/PictureItem'
import { fetchPictures, setStateTipe } from '../../redux/action/picturesAction'
import { useDispatch, useSelector } from 'react-redux'
import { getPictures, getStateTipe } from '../../redux/selector/picturesSelector'
import './Works.scss'

export default function Works() {
  const dispatch = useDispatch()
  const pictures = useSelector(getPictures)
  const stateTipe = useSelector(getStateTipe)


  useEffect(() => {
    dispatch(fetchPictures(stateTipe))
  }, [stateTipe])

  return (
    <div className='works'>
      <div className="works__btns">
        <Button text={'Штаны'} active={stateTipe === 'trousers'} onClick={() => dispatch(setStateTipe('trousers'))} />
        <Button text={'Футболки'} active={stateTipe === 't-shirts'} onClick={() => dispatch(setStateTipe('t-shirts'))} />
        <Button text={'Куртки'} active={stateTipe === 'jackets'} onClick={() => dispatch(setStateTipe('jackets'))} />
        <Button text={'Комбинизоны'} active={stateTipe === 'jumpsuits'} onClick={() => dispatch(setStateTipe('jumpsuits'))} />
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
