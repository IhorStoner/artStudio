import React, { useEffect } from 'react'
import OpenPicture from '../../components/OpenPicture/OpenPicture'
import { useDispatch, useSelector } from 'react-redux'
import { getOnePicture } from '../../redux/selector/picturesSelector'
import { fetchOnePicture } from '../../redux/action/picturesAction'

export default function OpenPicturePage({ id }) {
  const dispatch = useDispatch()
  const picture = useSelector(getOnePicture)

  useEffect(() => {
    dispatch(fetchOnePicture(id))
  }, [id])

  return (
    <div>
      <OpenPicture picture={picture} />
    </div>
  )
}
