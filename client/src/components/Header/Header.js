import React, { useContext, useEffect, useState } from 'react'
import './Header.scss'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { ReactComponent as Instagram } from '../../assets/svg/instagram.svg'
import { ReactComponent as Telegram } from '../../assets/svg/telegram.svg'
import { ReactComponent as Basket } from '../../assets/svg/basket.svg'
import logo from '../../assets/png/logo.png';
import { setStateType } from '../../redux/action/picturesAction';
import { MobileMenu } from '../../redux/action/localAction';
import { useSelector, useDispatch } from 'react-redux'
import { getStateOrder } from '../../redux/selector/picturesSelector';
import { localSelector } from '../../redux/selector/localSelector';
import { getTypesOfClothing, getStateType } from '../../redux/selector/picturesSelector';
import  humburger  from '../../assets/svg/hamburger.svg'

export default function Header() {
  const dispatch = useDispatch();
  const stateOrder = useSelector(getStateOrder)
  const stateTypes = useSelector(getTypesOfClothing)
  const stateType = useSelector(getStateType)
  const	stateLocal = useSelector(localSelector)
  const [category, setCategory] = useState(null)
  const [picturePage, setPicturePage] = useState(false)
  const { nav } = useParams()
  const { isAuthenticated } = useContext(AuthContext)
  const { push } = useHistory()
  const [amount, setAmount] = useState(null)
  const history = useHistory();

  useEffect(() => {
    const count = stateOrder.reduce((accum, elem) => { return accum + elem.amount }, 0)
    setAmount(count)
  }, [stateOrder])


  return (<>
    <div className='header'>
      <div className="container">
        {isAuthenticated && <NavLink to='/home/adminPanel' className={`header__nav-item--admin  ${nav === 'adminPanel' && 'header__nav-item--active'}`}>AdminPanel</NavLink>}
        <div className="header__container">
					<div className="header__logo">
						<div className="logo__area">
							<img className="logo__img" src={logo} alt="artStudio" onClick={() => push('/home/')} />
						</div>
						<div className="header__numburger" onClick = {() => { stateLocal.mobileMenu ? dispatch(MobileMenu(false)) : dispatch(MobileMenu(true))}} >
							<img className={`header__picture-numburger ${stateLocal.mobileMenu ? "header__picture-numburger--open" : ""}`} src={humburger} alt="humburger" />
						</div>
            <NavLink className="header__wrap-basket header__cart-mobile" to='/home/orderForm'>
              <Basket className="header__basket" />
              <span className="header__count-span">{amount}</span>
            </NavLink>
					</div>
          
					<div className="header__interaction">
						<div className="header__info">
							<div className="header__contact">
								<NavLink className="header__social" to="/home/works">
									<Telegram />
								</NavLink>
								<NavLink className="header__social" to="/home/works">
									<Instagram />
								</NavLink>
								<a className="header__telephone" href="tel:+(380) 66 666 66 66">+(380) 66 666 66 66</a>
							</div>
							<NavLink className="header__wrap-basket" to='/home/orderForm'>
								<Basket className="header__basket" />
							</NavLink>
							<span className="header__basket-span">Корзина: {amount}</span>
						</div>
						<nav className='header__nav'>
							<ul className="header__nav-list">
								<li className="header__course">
									<NavLink to='/home/works' className={`header__nav-item ${nav === 'works' && 'header__nav-item--active'}`}>Каталог</NavLink>
								</li>
								<li className="header__course">
									<NavLink to='/home/aboutUs' className={`header__nav-item ${nav === 'aboutUs' && 'header__nav-item--active'}`}>О нас</NavLink>
								</li>
								<li className="header__course">
									<NavLink to='/home/masters' className={`header__nav-item ${nav === 'masters' && 'header__nav-item--active'}`}>Доставка и оплата</NavLink>
								</li>
								<li className="header__course" >
									<NavLink to='/home/delivery' className={`header__nav-item ${nav === 'delivery' && 'header__nav-item--active'}`}>Контакты</NavLink>
								</li>
							</ul>
						</nav>
					</div>
        </div>
      </div>
    </div>
		{	(!stateLocal.mobileMenu  && history.location.pathname === "/home/works" && category !== null) &&
 			<div className='header__current-open-category' >
				<span className='header__current-open-category-text'>{category}</span>
			</div>
		}
		{stateLocal.mobileMenu && 
			<div className="mobile-menu">
				<ul className="mobile__nav-list">
				{stateTypes.map(type => (
					<li className="mobile-menu__category-item" key={type} onClick={() => {setCategory(type)}} >
						<span className={`mobile__link ${stateType === type?"mobile__link--active":""}`} onClick={() =>{dispatch(setStateType(type));setPicturePage(false); dispatch(MobileMenu(false))}  } >{type}</span>
					</li>
        )
        )}
				</ul>
				<nav className='mobile'>
					<ul className="mobile__nav-list">
						<li className="mobile__course">
							<NavLink to='/home/works' className={`mobile__link header__nav-item ${nav === 'works' && 'header__nav-item--active'}`}>Каталог</NavLink>
						</li>
						<li className="mobile__course">
							<NavLink to='/home/aboutUs' className={`mobile__link header__nav-item ${nav === 'aboutUs' && 'header__nav-item--active'}`}>О нас</NavLink>
						</li>
						<li className="mobile__course">
							<NavLink to='/home/masters' className={`mobile__link header__nav-item ${nav === 'masters' && 'header__nav-item--active'}`}>Доставка и оплата</NavLink>
						</li>
						<li className="mobile__course" >
							<NavLink to='/home/delivery' className={`mobile__link header__nav-item ${nav === 'delivery' && 'header__nav-item--active'}`}>Контакты</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		}

		</>
  )
}