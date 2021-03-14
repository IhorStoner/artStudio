import React, { useContext } from 'react'
import './Header.scss'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ReactComponent as Instagram } from '../../assets/svg/instagram.svg'
import { ReactComponent as Telegram } from '../../assets/svg/telegram.svg'
import { ReactComponent as Basket } from '../../assets/svg/basket.svg'

export default function Header() {
  const { nav } = useParams()
  const { isAuthenticated } = useContext(AuthContext)
  const { push } = useHistory()

  return (
    <div className='header'>
      {isAuthenticated && <NavLink to='/home/adminPanel' className={`header__nav-item  ${nav === 'adminPanel' && 'header__nav-item--active'}`}>AdminPanel</NavLink>}
      <div className="container">
        <div className="header__logo-container">
          <div>
            <Instagram />
            <Telegram />
            <span>+(380) 66 666 66 66</span>
          </div>
          <Basket className="header__basket" onClick={() => push('/home/orderForm')} />

          {/* <NavLink to='/home/aboutUs'><img className='header__logo' src={logo} alt="" /></NavLink> */}
        </div>
        <nav className='header__nav'>
          <ul className="header__nav-list">
            <li>
              <NavLink to='/home/aboutUs' className={`header__nav-item ${nav === 'aboutUs' && 'header__nav-item--active'}`}>О нас</NavLink>
            </li>
            <li>
              <NavLink to='/home/works' className={`header__nav-item ${nav === 'works' && 'header__nav-item--active'}`}>Каталог</NavLink>
            </li>
            <li >
              <NavLink to='/home/masters' className={`header__nav-item ${nav === 'masters' && 'header__nav-item--active'}`}>Доставка и оплата</NavLink>
            </li>
            <li>
              <NavLink to='/home/delivery' className={`header__nav-item ${nav === 'delivery' && 'header__nav-item--active'}`}>Контакты</NavLink>
            </li>
            <li>
              <NavLink to='/home/garants' className={`header__nav-item ${nav === 'garants' && 'header__nav-item--active'}`}>Гарантии качества</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
