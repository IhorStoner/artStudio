import React from 'react'
import './Footer.scss'
import { useParams } from 'react-router-dom'
import logo from '../../assets/png/logo.png'

export default function Footer() {
  const { nav } = useParams()

  return (
    <div className='footer'>
      {/* <nav className='footer__nav'>
        <ul className='footer__navList'>
          <li>
            <NavLink to='/home/aboutUs' className={`footer__navItem ${nav === 'aboutUs' && 'footer__navItem--active'}`}>О нас</NavLink>
          </li>
          <li>
            <NavLink to='/home/works' className={`footer__navItem ${nav === 'works' && 'footer__navItem--active'}`}>Наши работы</NavLink>
          </li>
          <li >
            <NavLink to='/home/masters' className={`footer__navItem ${nav === 'masters' && 'footer__navItem--active'}`}>Наши мастера</NavLink>
          </li>
          <li>
            <NavLink to='/home/delivery' className={`footer__navItem ${nav === 'delivery' && 'footer__navItem--active'}`}>Оплата и доставка</NavLink>
          </li>
          <li>
            <NavLink to='/home/garants' className={`footer__navItem ${nav === 'garants' && 'footer__navItem--active'}`}>Гарантии качества</NavLink>
          </li>
        </ul>
      </nav> */}
      <div className="footer__logoContainer">
        <img className="footer__logo" src={logo} alt="artStudio" />
        <p className='footer__copyright'>©Арт Студия “название” 2021</p>
      </div>
    </div>
  )
}
