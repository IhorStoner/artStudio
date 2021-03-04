import React from 'react'
import './AdminPicturesList.scss'
import picture from '../../assets/png/picture.png'


export default function AdminPicturesList() {
  return (
    <div className="container">
      <div className='admin-pictures-list'>
        <div className='admin-pictures-list__head'>
          <div className='admin-pictures-list__item-text'>Название</div>
          <div className='admin-pictures-list__item-text'>Тип</div>
          <div className='admin-pictures-list__item-text'>Описание</div>
          <div className='admin-pictures-list__item-text'>Размеры</div>
          <div className='admin-pictures-list__item-text admin-pictures-list--small'>Дата </div>
          {/* <div className='admin-pictures-list__item-text admin-pictures-list--small'>Дата публикации</div> */}
          <div className='admin-pictures-list__item-text'>Цена</div>
          <div className='admin-pictures-list__item-text admin-pictures-list__item-text--small'>Отображать</div>
          {/* <div className='admin-pictures-list__item-text admin-pictures-list__item-text--small'>Отображать на сайте</div> */}
          <div></div>
        </div>

        <div className='admin-pictures-list__data'>
          <div ><img src={picture} alt="альтернативный текст" /></div>
          <div className='admin-pictures-list__item-text'>Топ майка расписная</div>
          <div className='admin-pictures-list__item-text'>футболка</div>
          <div className='admin-pictures-list__item-text'>описание футболки</div>
          <div className='admin-pictures-list__item-text'>XXL, XL, L, M, S, XS, XXS</div>
          <div className='admin-pictures-list__item-text'>03.02.2021</div>
          <div className='admin-pictures-list__item-text'>100грн</div>
          <div className='admin-pictures-list__item-text'>btns</div>
        </div>
        <div className='admin-pictures-list__data'>
          <div ><img src={picture} alt="альтернативный текст" /></div>
          <div className='admin-pictures-list__item-text'>Топ майка расписная</div>
          <div className='admin-pictures-list__item-text'>футболка</div>
          <div className='admin-pictures-list__item-text'>описание футболки</div>
          <div className='admin-pictures-list__item-text'>XXL, XL, L, M, S, XS, XXS</div>
          <div className='admin-pictures-list__item-text'>03.02.2021</div>
          <div className='admin-pictures-list__item-text'>100грн</div>
          <div className='admin-pictures-list__item-text'>btns</div>
        </div>
        <div className='admin-pictures-list__data'>
          <div ><img src={picture} alt="альтернативный текст" /></div>
          <div className='admin-pictures-list__item-text'>Топ майка расписная</div>
          <div className='admin-pictures-list__item-text'>футболка</div>
          <div className='admin-pictures-list__item-text'>описание футболки</div>
          <div className='admin-pictures-list__item-text'>XXL, XL, L, M, S, XS, XXS</div>
          <div className='admin-pictures-list__item-text'>03.02.2021</div>
          <div className='admin-pictures-list__item-text'>100грн</div>
          <div className='admin-pictures-list__item-text'>btns</div>
        </div>

      </div>
    </div>
  )
}
