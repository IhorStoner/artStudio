import React,{useState,useEffect} from 'react'
import Button from '../Button/Button'
import PictureItem from '../PictureItem/PictureItem'
import {fetchPictures} from '../../redux/action/picturesAction'
import {useDispatch,useSelector} from 'react-redux'
import {getPictures} from '../../redux/selector/picturesSelector'
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
        <Button text={'Масло'} active={activeItem === 'oil'} onClick={() => setActiveItem('oil')}/>
        <Button text={'Акрил'} active={activeItem === 'acrylic'} onClick={() => setActiveItem('acrylic')}/>
      </div>
      <div className="works__content">
        {
          pictures && pictures.map(picture => (
            <PictureItem className='works__item' picture={picture}/>
          ))
        }
        
      </div>
    </div>
  )
}
