import React from 'react'
import './Button.scss'

export default function Button({text, onClick,active}) {
  const handleClickBtn = (e) => {
    onClick(e)
  }
  return (
    <button className={`btn ${active && 'btn--active'}`} onClick={(e) => handleClickBtn(e)}>{text}</button>
  )
}
