import React, { useState, useEffect, useCallback } from 'react'
import Button from '../Button/Button'
import PictureItem from '../PictureItem/PictureItem'
import { fetchPictures, setStateType } from '../../redux/action/picturesAction'
import { useDispatch, useSelector } from 'react-redux'
import { getPictures, getStateType, getTypesOfClothing } from '../../redux/selector/picturesSelector'
import './Works.scss'
import OpenPicturePage from '../../pages/OpenPicturePage/OpenPicturePage'
import config from '../../config/default.json'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export default function Works() {
  const [picturePage, setPicturePage] = useState(false)
  const stateTypes = useSelector(getTypesOfClothing)
  const [picturePreview, setPicturePreview] = useState(false)
  const [id, setId] = useState()
  const dispatch = useDispatch()
  const pictures = useSelector(getPictures)
  const stateType = useSelector(getStateType)


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

    dispatch(fetchPictures(stateType))
    setStateType(stateType[0])
  }, [stateType])

  const handleOpenPreview = (picture) => {
    setPicturePreview(picture)
  }

  return (
    <div className='works'>
      <div className="works__btns">
        {stateTypes.map(typeClothes => (
          <Button
            key={typeClothes}
            text={typeClothes}
            active={stateType === typeClothes}
            onClick={() => {
              dispatch(setStateType([typeClothes]));
              setPicturePage(false)
            }} />
        ))}

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
