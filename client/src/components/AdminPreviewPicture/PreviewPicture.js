import React, { useEffect } from 'react'
import './PreviewPicture.scss'
import OpenPictureSlider from '../OpenPictureSlider/OpenPictureSlider'
import { fetchOnePicture } from '../../redux/action/picturesAction'
import { useDispatch, useSelector } from 'react-redux'
import { getOnePicture } from '../../redux/selector/picturesSelector'

export default function PreviewPicture({ id }) {
    const dispatch = useDispatch()
    const picture = useSelector(getOnePicture)


    useEffect(() => {
        dispatch(fetchOnePicture(id))
    }, [id])

    return (
        <div className='container'>
            <div className="openPicture">
                <h2 className="openPicture__title">{picture.title}</h2>
                <div className="openPicture__slider">
                    {picture.images && <OpenPictureSlider imgArr={picture.images} thumbs={true} />}
                </div>
                <p className='openPicture__description'>{picture.text}</p>
                <div className="openPicture__priceContainer">
                    <div className="openPicture__price">
                        <span>Цена:</span>
                        <span>{picture.price}</span>
                    </div>
                    {/* <button className='openPicture__btn'>Заказать</button> */}
                </div>
            </div>
        </div>
    )
}