import React, { useState } from 'react'
import NewPictureForm from '../NewPictureForm/NewPictureForm'
import Button from '../Button/Button'
import './AdminPanel.scss'
import AdminPicturesList from '../AdminPicturesList/AdminPicturesList'
import EdditPicturesForm from '../EdditPicturesForm/EdditPicturesForm'
import { ReactComponent as MagnifierSVG } from '../../assets/svg/magnifier.svg'
import OpenPicturePage from '../../pages/OpenPicturePage/OpenPicturePage'

export default function AdminPanel() {
  const [activeItem, setActiveItem] = useState('picturesList')


  return (
    <div className='adminPanel'>
      <div className="adminPanel__btns">
        <Button className='adminPanel__btn' text='Заказы' active={false} onClick={() => setActiveItem('newPicture')} />
        <Button className='adminPanel__btn' text='Добавить товар' active={activeItem === 'newPicture'} onClick={() => setActiveItem('newPicture')} />
        <Button className='adminPanel__btn' text='Список товаров' active={activeItem === 'picturesList'} onClick={() => setActiveItem('picturesList')} />
        <Button className='adminPanel__btn' text='Добавить категорию' active={activeItem === 'picturesCategories'} onClick={() => setActiveItem('picturesCategories')} />
        <input />
        <MagnifierSVG />
      </div>
      {activeItem === 'newPicture' && <NewPictureForm />}
      {activeItem === 'picturesList' && <AdminPicturesList setActiveItem={setActiveItem} />}
      {activeItem === 'edditPicture' && <EdditPicturesForm />}
      {activeItem === 'showPicture' && <OpenPicturePage />}
    </div>
  )
}
