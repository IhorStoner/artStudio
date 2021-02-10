import React from 'react'
import './Button.scss'

export default function Button({text, onClick,active,className}) {
  const handleClickBtn = (e) => {
    onClick && onClick(e)
  }
  
  return (
    <button className={`btn ${active && 'btn--active'} ${className}`} onClick={(e) => handleClickBtn(e)}>{text}</button>
  )
}
