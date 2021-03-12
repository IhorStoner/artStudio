import React, { useState, useEffect } from 'react'
import Button from '../Button/Button'
import PictureItem from '../PictureItem/PictureItem'
import { fetchPictures, setStateTipe } from '../../redux/action/picturesAction'
import { useDispatch, useSelector } from 'react-redux'
import { getPictures, getStateTipe } from '../../redux/selector/picturesSelector'
import './Works.scss'
import OpenPicturePage from '../../pages/OpenPicturePage/OpenPicturePage'
import config from '../../config/default.json'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export default function Works() {
  const [picturePage, setPicturePage] = useState(false)
  const [picturePreview, setPicturePreview] = useState(false)
  const [id, setId] = useState()
  const dispatch = useDispatch()
  const pictures = useSelector(getPictures)
  const stateTipe = useSelector(getStateTipe)

  const handleOpeningPicture = id => {
    if (picturePage) {
      setId('')
      setPicturePage(false)
    } else {
      setId(id)
      setPicturePage(true)
    }
  }
  useEffect(() => {

    dispatch(fetchPictures(stateTipe))
  }, [stateTipe])

  const handleOpenPreview = (picture) => {
    setPicturePreview(picture)
  }

  const fetchTypes = async (activeItem) => { // получение из базы данных коллекцию уникальных типов
    const data = axios.get(`${config.serverUrl}/api/pictures/categories`).then(
      res => console.log(res.data))
    console.log(data)
    return data;
  };



  return (
    <div className='works'>
      <div className="works__btns">
        <Button text={'Штаны'} active={stateTipe === 'trousers'} onClick={() => { dispatch(setStateTipe('trousers')); setPicturePage(false) }} />
        <Button text={'Футболки'} active={stateTipe === 't-shirts'} onClick={() => { dispatch(setStateTipe('t-shirts')); setPicturePage(false) }} />
        <Button text={'Куртки'} active={stateTipe === 'jackets'} onClick={() => { dispatch(setStateTipe('jackets')); setPicturePage(false) }} />
        <Button text={'Комбинизоны'} active={stateTipe === 'jumpsuits'} onClick={() => { dispatch(setStateTipe('jumpsuits'));; setPicturePage(false) }} />
        {/* <Button text={'types'} active={stateTipe === 'jumpsuits'} onClick={() => fetchTypes()} /> */}
      </div>
      {
        picturePage
          ? <OpenPicturePage handleOpenPreview={handleOpenPreview} id={id} />
          : <div className="works__content">
            {pictures?.map((picture, index) => (
              <PictureItem
                key={index}
                className='works__item'
                picture={picture}
                handleOpeningPicture={handleOpeningPicture}
              />
            ))}
          </div>
      }
    </div>
  )
}
