import React, { useState, useEffect } from 'react'
import Button from '../Button/Button'
import PictureItem from '../PictureItem/PictureItem'
import { fetchPictures, setStateType } from '../../redux/action/picturesAction'
import { useDispatch, useSelector } from 'react-redux'
import { getPicturePreview, getPictures, getStateType, getTypesOfClothing } from '../../redux/selector/picturesSelector'
import './Works.scss'
import OpenPicturePage from '../../pages/OpenPicturePage/OpenPicturePage'
import BigImages from '../BigImage/BigImages'


export default function Works() {
  const [picturePage, setPicturePage] = useState(false)
  const stateTypes = useSelector(getTypesOfClothing)
  const picturePreview = useSelector(getPicturePreview)
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
  }, [stateType])

  useEffect(() => {
    dispatch(setStateType(stateTypes[0]))
  }, [stateTypes])


  return (
    <div className='works'>
      {
        picturePreview && <div className='works__popup' >
          <BigImages imgArr={picturePreview} thumbs={true} />
        </div>
      }
      <div className="works__btns">
        {stateTypes.map(type => (
          <Button
            key={type}
            text={type}
            active={stateType === type}
            onClick={() => {
              dispatch(setStateType(type));
              setPicturePage(false)
            }} />
        )
        )}

      </div>
      {
        picturePage
          ? <OpenPicturePage id={id} />
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
