import React, { useState } from 'react'
import NewPictureForm from '../NewPictureForm/NewPictureForm'
import Button from '../Button/Button'
import './AdminPanel.scss'
import AdminPicturesList from '../AdminPicturesList/AdminPicturesList'
import { ReactComponent as Magnifier } from '../../assets/svg/magnifier.svg'

export default function AdminPanel() {
  const [activeItem, setActiveItem] = useState('picturesList')


  return (
    <div className='adminPanel'>
      <div className="adminPanel__btns">
        <Button className='adminPanel__btn' text='Заказы' active={false} onClick={() => setActiveItem('newPicture')} />
        <Button className='adminPanel__btn' text='Добавить товар' active={activeItem === 'newPicture'} onClick={() => setActiveItem('newPicture')} />
        <Button className='adminPanel__btn' text='Список товаров' active={activeItem === 'picturesList'} onClick={() => setActiveItem('picturesList')} />
        <input />
        <Magnifier />
      </div>
      {activeItem === 'newPicture' && <NewPictureForm />}
      {activeItem === 'picturesList' && <AdminPicturesList />}
    </div>
  )
}
