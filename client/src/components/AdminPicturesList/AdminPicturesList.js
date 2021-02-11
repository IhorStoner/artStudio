import React from 'react'
import './AdminPicturesList.scss'

export default function AdminPicturesList() {
  return (
    <div className="container">
      <table className='adminPicturesList'>
        <tr className='adminPicturesList__item'>
          <td className='adminPicturesList__itemText'>img</td>
          <td className='adminPicturesList__itemText'>Название</td>
          <td className='adminPicturesList__itemText'>Краска</td>
          <td className='adminPicturesList__itemText'>Описание</td>
          <td className='adminPicturesList__itemText'>Дата пуб.</td>
          <td className='adminPicturesList__itemText'>Цена</td>
          <td>btns</td>
        </tr>
        
        <tr className='adminPicturesList__item'>
          <td >img</td>
          <td className='adminPicturesList__itemText'>name</td>
          <td className='adminPicturesList__itemText'>type</td>
          <td className='adminPicturesList__itemText'>descr</td>
          <td className='adminPicturesList__itemText'>date</td>
          <td className='adminPicturesList__itemText'>price</td>
          <td className='adminPicturesList__itemText'>btns</td>
        </tr>
      </table>
    </div>

  )
}
