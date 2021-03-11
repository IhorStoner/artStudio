import React, { useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import OpenPicture from '../../components/OpenPicture/OpenPicture'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOnePicture } from '../../redux/selector/picturesSelector'
import { fetchOnePicture } from '../../redux/action/picturesAction'

export default function OpenPicturePage() {
  const { pictureId } = useParams()
  const dispatch = useDispatch()
  const picture = useSelector(getOnePicture)

  useEffect(() => {
    dispatch(fetchOnePicture(pictureId))
  }, [pictureId])

  return (
    <div>
      <Header />
      <OpenPicture picture={picture} />
      <Footer />
    </div>
  )
}
