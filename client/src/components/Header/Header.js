import React, { useContext } from 'react'
import './Header.scss'
import logo from '../../assets/png/logo.png'
import { NavLink, useParams } from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'

export default function Header() {
  const {nav} = useParams()
  const {isAuthenticated} = useContext(AuthContext)

  return (
    <div className='header'>
      <div className="container">
        {isAuthenticated && <NavLink to='/home/adminPanel' className={`header__navItem  ${nav === 'adminPanel' && 'header__navItem--active'}`}>AdminPanel</NavLink>}
        <div className="header__logoContainer">
          <NavLink to='/home/aboutUs'><img className='header__logo' src={logo} alt="" /></NavLink>
        </div>
        <nav className='header__nav'>
          <ul className="header__navList">
            <li>
              <NavLink to='/home/aboutUs' className={`header__navItem ${nav === 'aboutUs' && 'header__navItem--active'}`}>О нас</NavLink>
            </li>
            <li>
              <NavLink to='/home/works' className={`header__navItem ${nav === 'works' && 'header__navItem--active'}`}>Наши работы</NavLink>
            </li>
            <li >
              <NavLink to='/home/masters' className={`header__navItem ${nav === 'masters' && 'header__navItem--active'}`}>Наши мастера</NavLink>
            </li>
            <li>
              <NavLink to='/home/delivery' className={`header__navItem ${nav === 'delivery' && 'header__navItem--active'}`}>Оплата и доставка</NavLink>
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
