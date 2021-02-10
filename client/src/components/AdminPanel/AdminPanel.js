import React,{useState} from 'react'
import NewPictureForm from '../NewPictureForm/NewPictureForm'
import Button from '../Button/Button'
import './AdminPanel.scss'

export default function AdminPanel() {
  const [activeItem,setActiveItem] = useState('newPicture')
  return (
    <div className='adminPanel'>
      <div className="adminPanel__btns">
        <Button className='adminPanel__btn' text='Добавить товар' active={activeItem === 'newPicture'} onClick={() => setActiveItem('newPicture')}/>
        <Button className='adminPanel__btn' text='Список товаров' active={activeItem === 'picturesList'} onClick={() => setActiveItem('picturesList')}/>
      </div>
      {activeItem === 'newPicture' && <NewPictureForm />}
      
    </div>
  )
}
