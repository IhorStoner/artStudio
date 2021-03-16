import React, { useEffect, useState } from 'react'
import NewPictureForm from '../NewPictureForm/NewPictureForm'
import Button from '../Button/Button'
import './AdminPanel.scss'
import AdminPicturesList from '../AdminPicturesList/AdminPicturesList'
import EdditPicturesForm from '../EdditPicturesForm/EdditPicturesForm'
import { ReactComponent as MagnifierSVG } from '../../assets/svg/magnifier.svg'
import OpenPicturePage from '../../pages/OpenPicturePage/OpenPicturePage'
import { EdditCategories } from '../EdditCategories/EdditCategories'
import { OrdersList } from '../OrdersList/OrdersList'
import { useDispatch } from 'react-redux'
import { setIndexOfList } from '../../redux/action/orderAction'

export default function AdminPanel() {
  const [activeItem, setActiveItem] = useState('picturesList')
  const dispatch = useDispatch()

  return (
    <div className='adminPanel'>
      <div className="adminPanel__btns">
        <Button className='adminPanel__btn' text='Заказы' active={activeItem === 'orders'} onClick={() => { setActiveItem('orders'); dispatch(setIndexOfList(null)) }} />
        <Button className='adminPanel__btn' text='Добавить товар' active={activeItem === 'newPicture'} onClick={() => setActiveItem('newPicture')} />
        <Button className='adminPanel__btn' text='Список товаров' active={activeItem === 'picturesList'} onClick={() => setActiveItem('picturesList')} />
        <Button className='adminPanel__btn' text='Добавить категорию' active={activeItem === 'picturesCategories'} onClick={() => setActiveItem('picturesCategories')} />
        <input />
        <MagnifierSVG />
      </div>
      {activeItem === 'orders' && <OrdersList />}
      {activeItem === 'newPicture' && <NewPictureForm />}
      {activeItem === 'picturesList' && <AdminPicturesList setActiveItem={setActiveItem} />}
      {activeItem === 'edditPicture' && <EdditPicturesForm />}
      {activeItem === 'showPicture' && <OpenPicturePage />}
      {activeItem === 'picturesCategories' && <EdditCategories />}
    </div>
  )
}
