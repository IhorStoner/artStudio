import React, { useCallback, useEffect, useState } from 'react'
import './AdminPicturesList.scss'
import picture from '../../assets/png/picture.png'
import { ReactComponent as Delete } from '../../assets/svg/delete.svg'
import { ReactComponent as Open } from '../../assets/svg/open.svg'
import { ReactComponent as Correct } from '../../assets/svg/correct.svg'
import axios from 'axios'
import config from '../../config/default.json'
import { NavLink } from 'react-router-dom'


export default function AdminPicturesList() {

  const [state, setState] = useState()

  const fetchData = useCallback(async (ev) => {

    const { data } = await axios.get(`${config.serverUrl}/api/pictures/all/all`)
    const freshDate = data.map(elem => ({ ...elem, date: elem.date.slice(0, 10).replace(/-/g, '.') }))
    console.log(freshDate)
    setState(freshDate)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])


  const deleteObj = useCallback(async (imgId) => {
    const data = { id: imgId }
    // const response = await axios.delete(`${config.serverUrl}/api/pictures/delete/`, data)
  })

  return (
    <div className="container">
      <div className='admin-pictures-list'>
        <div className='admin-pictures-list__head'>
          <div className='admin-pictures-list__item-text' onClick={() => fetchData()}>Название</div>
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
              <div className='admin-pictures-list__item-text'><input type='checkbox' defaultChecked={elem.onSite}></input></div>
              <div className='admin-pictures-list__item-text'><Correct /> <NavLink to={`/home/works/${elem._id}`}>  <Open /></NavLink> <Delete onClick={() => deleteObj()} /></div>
            </div>)
        })}

        <div className="admin-pictures-list__pagination-container" >
          <div><span>Первая</span></div>
          <div><span>Предидущая</span></div>
          <div>4 5 6 7 8 9 10</div>
          <div>Следующая</div>
          <div>Последняя</div>
        </div>

      </div>
    </div>
  )
}
