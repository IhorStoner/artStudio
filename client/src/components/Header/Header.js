import React, { useContext, useEffect, useState } from 'react'
import './Header.scss'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ReactComponent as Instagram } from '../../assets/svg/instagram.svg'
import { ReactComponent as Telegram } from '../../assets/svg/telegram.svg'
import { ReactComponent as Basket } from '../../assets/svg/basket.svg'
import logo from '../../assets/png/logo.png'
import { useSelector } from 'react-redux'
import { getStateOrder } from '../../redux/selector/picturesSelector'


export default function Header() {
  const stateOrder = useSelector(getStateOrder)
  const { nav } = useParams()
  const { isAuthenticated } = useContext(AuthContext)
  const { push } = useHistory()
  const [amount, setAmount] = useState(null)

  useEffect(() => {
    const count = stateOrder.reduce((accum, elem) => { return accum + elem.amount }, 0)
    setAmount(count)
  }, [stateOrder])


  return (
    <div className='header'>
      <div className="container">
        {isAuthenticated && <NavLink to='/home/adminPanel' className={`header__nav-item--admin  ${nav === 'adminPanel' && 'header__nav-item--active'}`}>AdminPanel</NavLink>}
        <div className="header__logo-container">
          <img src={logo} alt="artStudio" onClick={() => push('/home/works')} />
          <span className="header__basket-span">Корзина: {amount}</span>
          <NavLink to='/home/orderForm'>
            <Basket className="header__basket" />
          </NavLink>
          <div className="header__contact">
            <NavLink to="/home/works">
              <Telegram />
            </NavLink>
            <NavLink to="/home/works">
              <Instagram />
            </NavLink>
            <NavLink to="/home/works">
              <span>+(380) 66 666 66 66</span>
            </NavLink>
          </div>
        </div>
        <nav className='header__nav'>
          <ul className="header__nav-list">
            <li>
              <NavLink to='/home/delivery' className={`header__nav-item ${nav === 'delivery' && 'header__nav-item--active'}`}>Контакты</NavLink>
            </li>
            <li >
              <NavLink to='/home/masters' className={`header__nav-item ${nav === 'masters' && 'header__nav-item--active'}`}>Доставка и оплата</NavLink>
            </li>
            <li>
              <NavLink to='/home/aboutUs' className={`header__nav-item ${nav === 'aboutUs' && 'header__nav-item--active'}`}>О нас</NavLink>
            </li>
            <li>
              <NavLink to='/home/works' className={`header__nav-item ${nav === 'works' && 'header__nav-item--active'}`}>Каталог</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}