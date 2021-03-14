import React, { useCallback, useEffect, useState } from 'react'
import './AdminPicturesList.scss'
import { ReactComponent as Delete } from '../../assets/svg/delete.svg'
import { ReactComponent as Open } from '../../assets/svg/open.svg'
import { ReactComponent as Correct } from '../../assets/svg/correct.svg'
import { ReactComponent as IncludesInSite } from '../../assets/svg/includesInSite.svg'
import axios from 'axios'
import config from '../../config/default.json'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setStateEdditPicture } from '../../redux/action/picturesAction'


export default function AdminPicturesList({ setActiveItem }) {
  const [deletePicture, setDeletePicture] = useState(false)
  const [idDeletePicture, setIdDeletePicture] = useState(null)
  const [state, setState] = useState()
  const dispatch = useDispatch()

  const fetchData = useCallback(async (ev) => {

    const { data } = await axios.get(`${config.serverUrl}/api/pictures/all/all`)
    const freshDate = data.map(elem => ({ ...elem, date: elem.date.slice(0, 10).replace(/-/g, '.') }))
    setState(freshDate)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])


  const deleteObj = useCallback(async (imgId) => {
    await axios.delete(`${config.serverUrl}/api/pictures/${imgId}`).then(res => console.log('res ', res))
    fetchData()
  })

  const refToCorrect = (obj) => {
    setActiveItem('edditPicture')
    dispatch(setStateEdditPicture(obj))

  }

  const handleDeleteObj = (id) => {
    deleteObj(id)
  }


  return (
    <div className="container">
      <div className='admin-pictures-list'>
        {deletePicture && <div className='admin-pictures-list__popup'>
          <div className='admin-pictures-list__modal'>Вы действительно хотите удалить этот товар?
            <div>
              <button onClick={() => { handleDeleteObj(idDeletePicture); setDeletePicture(false) }}>Да, удалить</button>
              <button onClick={() => setDeletePicture(false)}>Нет, оставить</button>
            </div>
          </div>
        </div>}
        <div className='admin-pictures-list__head'>
          <div className='admin-pictures-list__item-text'>Название</div>
          <div className='admin-pictures-list__item-text'>Тип</div>
          <div className='admin-pictures-list__item-text'>Описание</div>
          <div className='admin-pictures-list__item-text'>Размеры</div>
          <div className='admin-pictures-list__item-text admin-pictures-list--small'>Дата публикации </div>
          <div className='admin-pictures-list__item-text'>Цена</div>
          <div className='admin-pictures-list__item-text admin-pictures-list__item-text--small'>Отображать на сайте</div>
          <div></div>
        </div>

        {state?.map((elem) => {
          return (
            <div key={elem._id} className='admin-pictures-list__data'>
              <div ><img src={`${config.serverUrl}/api/images/${elem.images[0]}`} alt="альтернативный текст" /></div>
              <div className='admin-pictures-list__item-text'>{elem.title}</div>
              <div className='admin-pictures-list__item-text'>{elem.type}</div>
              <div className='admin-pictures-list__item-text'><span>{elem.text}</span></div>
              <div className='admin-pictures-list__item-text'>{elem.chart && Object.keys(elem.chart).map(v => v).join(", ").toUpperCase()}</div>
              <div className='admin-pictures-list__item-text'>{elem.date}</div>
              <div className='admin-pictures-list__item-text'>{elem.price}</div>
              <div className='admin-pictures-list__item-text'>{elem.onSite && <input type='checkbox' checked={elem.onSite}></input>}</div>
              <div className='admin-pictures-list__item-text'>
                <Correct className='admin-pictures-list__pointer' onClick={() => refToCorrect(elem)} />
                <NavLink to={`/home/works/${elem._id}`}>
                  <Open className='admin-pictures-list__pointer' /></NavLink>
                <Delete className='admin-pictures-list__pointer' onClick={() => { setDeletePicture(true); setIdDeletePicture(elem._id) }} /></div>
            </div>)
        })}

        <div className="admin-pictures-list__pagination-container" >
          <div><span className='admin-pictures-list__pointer'>Первая</span></div>
          <div><span className='admin-pictures-list__pointer'>Предидущая</span></div>
          <div> 4 5 6 7 8 9 10 </div>
          <div><span className='admin-pictures-list__pointer'>Следующая</span></div>
          <div><span className='admin-pictures-list__pointer'>Последняя</span></div>
        </div>

      </div>
    </div>
  )
}
