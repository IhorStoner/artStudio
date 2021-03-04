import React, { useContext } from 'react'
import './Header.scss'
import logo from '../../assets/png/logo.png'
import { NavLink, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ReactComponent as Instagram } from '../../assets/svg/instagram.svg'
import { ReactComponent as Telegram } from '../../assets/svg/telegram.svg'
import { ReactComponent as Basket } from '../../assets/svg/basket.svg'

export default function Header() {
  const { nav } = useParams()
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <div className='header'>
      {isAuthenticated && <NavLink to='/home/adminPanel' className={`header__navItem  ${nav === 'adminPanel' && 'header__navItem--active'}`}>AdminPanel</NavLink>}
      <div className="container">
        <div className="header__logoContainer">
          <div>
            <Instagram />
            <Telegram />
            <span>+(380) 66 666 66 66</span>
          </div>
          <Basket />

          {/* <NavLink to='/home/aboutUs'><img className='header__logo' src={logo} alt="" /></NavLink> */}
        </div>
        <nav className='header__nav'>
          <ul className="header__navList">
            <li>
              <NavLink to='/home/aboutUs' className={`header__navItem ${nav === 'aboutUs' && 'header__navItem--active'}`}>О нас</NavLink>
            </li>
            <li>
              <NavLink to='/home/works' className={`header__navItem ${nav === 'works' && 'header__navItem--active'}`}>Каталог</NavLink>
            </li>
            <li >
              <NavLink to='/home/masters' className={`header__navItem ${nav === 'masters' && 'header__navItem--active'}`}>Доставка и оплата</NavLink>
            </li>
            <li>
              <NavLink to='/home/delivery' className={`header__navItem ${nav === 'delivery' && 'header__navItem--active'}`}>Контакты</NavLink>
            </li>
            <li>
              <NavLink to='/home/garants' className={`header__navItem ${nav === 'garants' && 'header__navItem--active'}`}>Гарантии качества</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
