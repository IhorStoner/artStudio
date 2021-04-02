import React, { useState, useEffect } from 'react'
import Button from '../Button/Button'
import PictureItem from '../PictureItem/PictureItem'
import { fetchPictures, setStateType } from '../../redux/action/picturesAction'
import { useDispatch, useSelector } from 'react-redux'
import { getPicturePreview, getPictures, getStateType, getTypesOfClothing } from '../../redux/selector/picturesSelector'
import OpenPicturePage from '../../pages/OpenPicturePage/OpenPicturePage'
import { ReactComponent as Menu } from '../../assets/svg/hamburger.svg'
import BigImages from '../BigImage/BigImages'
import { setPicturePreview } from "../../redux/action/picturesAction";
import './Works.scss'


export default function Works({picturePage,setPicturePage}) {

 
  const stateTypes = useSelector(getTypesOfClothing)
  const picturePreview = useSelector(getPicturePreview)
  const [id, setId] = useState()
  const [openMenu, setOpenMenu] = useState(false)
  const dispatch = useDispatch()
  const pictures = useSelector(getPictures)
  const stateType = useSelector(getStateType)

  // по клику "заказать" открывает форму заказа (OpenPicturePage) и передает в нее id товара
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
    stateType && dispatch(fetchPictures(stateType))
  }, [dispatch, stateType])

  useEffect(() => {
    dispatch(setStateType(stateTypes[0]))
  }, [dispatch, stateTypes])

  return (
    <div className={`works${openMenu ? ' works--open' : ' works--close'}`} >
      {
        picturePreview && <div className='works__popup' onClick={(e) => {if(e.target.classList.contains("works__popup")) dispatch(setPicturePreview(null)) }} >
          <BigImages imgArr={picturePreview} thumbs={true} />
        </div>
      }
      <Menu onClick={() => setOpenMenu(!openMenu)} className={`works__svg ${openMenu ? 'works__svg--open' : 'works__svg--close'}`} />
      <div className={`works__btns ${openMenu ? 'works__btns--open' : 'works__btns--close'}`}>
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
          : <div className={`works__content ${openMenu ? 'works__content--open' : 'works__content--close'}`} >
            {pictures.map((picture, index) => {
              return (
                <PictureItem
                  key={index + picture._id}
                  className='works__item'
                  picture={picture}
                  handleOpeningPicture={handleOpeningPicture}
                />
              )
            })}
          </div>
      }
    </div>
  )
}
