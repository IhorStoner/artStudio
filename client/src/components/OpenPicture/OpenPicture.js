import React, { useEffect, useState } from 'react'
import './OpenPicture.scss'
import OpenPictureSlider from '../OpenPictureSlider/OpenPictureSlider'
import { ReactComponent as Increate } from '../../assets/svg/increate.svg'
import { ReactComponent as Discreate } from '../../assets/svg/discreate.svg'
import { ReactComponent as BasketDelete } from '../../assets/svg/basketDelete.svg'
import { ReactComponent as BtnClose } from '../../assets/svg/btnClose.svg'
import { useHistory } from 'react-router'
import { setOrderedGoods } from '../../redux/action/picturesAction'
import { useDispatch, useSelector } from 'react-redux'
import { getStateOrder } from '../../redux/selector/picturesSelector'
import { addProduct, rewriteOrderItem } from '../../redux/action/storageAction'
import { GoodsContainer } from './GoodsContainer'

export default function OpenPicture({ picture }) {
	// const haveSize = picture.chart ? Object.keys(picture.chart).find( el => {return (picture.chart[el].in) }) : ""
  const [stateAmount, setStateAmount] = useState(1)
  const [stateNavList, setStateNavList] = useState('Описание')
  const [selectedSize, setSelectedSize] = useState("s")
  const [sentToBasket, setSentToBasket] = useState(false)
  const [cost, setCost] = useState(0)
  const { push } = useHistory()
  const dispatch = useDispatch()
  const stateOrder = useSelector(getStateOrder)
	if(picture && picture.chart && picture.chart[selectedSize] && !picture.chart[selectedSize].in){
		const active = Object.keys(picture.chart).findIndex( key => picture.chart[key].in );
		setSelectedSize(Object.keys(picture.chart)[active])
	}

	const conditions = {
		"Доставка": (<div className="open-picture__pay-delivery">
                  <div className="open-picture__header">
                      <h5 className="open-picture__h5">Доставка</h5>
                  </div>
                  <div className="open-picture__country">
                      <h6 className="open-picture__h6">Украина</h6>
                      <span className="open-picture__text">
                          Доставка заказов осуществляется Транспортной Компанией «Новая Почта». Срок доставки 2-3 дня с момента подтверждения заказа при наличии товара на складе (при отсутствии товара на складе срок доставки может быть увеличен до 6 календарных дней), по Одессе доставка 24 часа с момента подтверждения заказа. Стоимость доставки согласно тарифов ТК «Новая Почта». При заказе товара от 5единиц доставка осуществляется бесплатно.
                      </span>
                      <h6 className="open-picture__h6">Другие страны.</h6>
                      <span className="open-picture__text">
                          Международная почта – срок доставки 10-16 рабочих дней. Стоимость доставки 15$.
                      </span>
                  </div>
                  <div className="open-picture__pay">
                      <h5 className="open-picture__h5 open-picture__h5--shifting">
                          Оплата
                      </h5>
                      <h6 className="open-picture__h6">Украина</h6>
                      <span className="open-picture__text open-picture__text--shift">
                          Безналичный расчет
                      </span>
                      <span className="open-picture__text">
                          Оплата производится в гривне на карту Приват Банка через приложение Приват24 или терминал с учетом комиссии Вашего Банка.
                      </span>
                  </div>
                  <div className="open-picture__send-pay">
                      <h5 className="open-picture__h5 open-picture__h5--bold">
                          Наложенный платеж
                      </h5>
                      <span className="open-picture__text">
                          Оплата при получении в отделении «Нова Почта» + 2% комиссии от суммы заказа за наложенный платеж
                          Заказы отправляются по предоплате 10% от стоимости заказа, но не менее 100 UAH. Эта сумма является страховочным платежом, который покрывает издержки доставки в обе стороны, если Вы по какой то причине не забрали посылку.
                          Внимание! Данный способ оплаты (наложенный платеж) является безопасным, но экономически не выгодным, комиссия за наложенный платеж взымается при доставке Новой Почтой. 
                      </span>
                  </div>
                  <div className="open-picture__different-country">
                      <h6 className="open-picture__h6">Другие страны</h6>
                      <span className="open-picture__text">
                          Полная оплата заказа. Оплата любой картой мира.
                      </span>
                  </div>
                </div>),
		"Оплата": "Способы оплаты  ".repeat(20),
		"Описание": picture.text
	}
	
  const handleSelectedSizi = (elem) => {
    setSelectedSize(elem)
  }

	useEffect(() => {
		setStateAmount(1)
		setCost(picture.price)
	},[selectedSize])

	useEffect(() => {
		setCost(picture.price)
	},[picture.picture, picture.price])

  const setToBasket = () => {
    
    setSentToBasket(true)
    if (stateAmount < 1) { alert('укажите количество товара'); return }
    const { price, _id, vendorCode, images, title } = picture
    const checkId = stateOrder.findIndex(elem => elem._id === _id && elem.size === selectedSize)

    if (checkId !== -1) {

      dispatch(rewriteOrderItem({ amount: stateAmount, title, size: selectedSize, price, _id, vendorCode, image: images[0] }))
        ; return
    }
    dispatch(addProduct({ amount: stateAmount, title, size: selectedSize, price, _id, vendorCode, image: images[0] }))
    // dispatch(setOrderedGoods({ amount: stateAmount, title, size: selectedSize, price, _id, vendorCode, image: images[0] }))
  }

  //input set count field
  const inputNewCount = (e) => {
    const targ = e.target.value;
    const toNumber = parseInt(targ);
    console.log(targ.trim().length === 0)
    if(targ.trim().length === 0) setStateAmount(parseInt(targ))
    if(targ.length <= 3 && !isNaN(toNumber)) calculate(toNumber)
  }

  //exit from input field check data to fix on correct
  const blurCheckCorrect = (e) => {
    const targ = e.target.value;
    const toNumber = parseInt(targ);
    if(isNaN(toNumber)) calculate(1)
  }

  //computed total summ
	const calculate = (digit) => {
		const { price } = picture;
		if(digit >= 1){
			setStateAmount(digit)
			setCost(digit * price)
		}
	}

  return (
    <div className='container'>
      {
        sentToBasket && <div className="sent-to-basket" onClick={(e) => { if(e.target.classList.contains("sent-to-basket")) setSentToBasket(false)}}>
          <div className="sent-to-basket__form">
            <div className="sent-to-basket__head">
              <h2>Корзина</h2>
              <div className="sent-to-basket__description-header"> <span>Количество</span> <span>Стоимость</span></div>
              <BtnClose className="sent-to-basket__btn-close" onClick={() => setSentToBasket(false)} />
            </div>
            <div className="sent-to-basket__main">
              <GoodsContainer />
            </div>
            <div className='sent-to-basket__foot'>
              <button className="sent-to-basket__foot-btn" onClick={() => { setSentToBasket(false) }}> К покупкам </button>
              <button className="sent-to-basket__foot-btn" onClick={() => { push('/home/orderForm') }}> Оформить заказ </button>
            </div>
          </div>
        </div>
      }
      <div className="open-picture">
        <div className="open-picture__articul">
          <h4 className="open-picture__articul-name">{picture.title}</h4>
          <span className="open-picture__articul-span">Артикул {picture.vendorCode}</span>
        </div>
        <div className="open-picture__main">
          <div className="open-picture__slider-container">
            <div className="open-picture__slider">
              {picture.images && <OpenPictureSlider imgArr={picture.images} thumbs={true} />}
            </div>
            {/* <div className="open-picture__discribe open-picture__mobile">
							<h4 className="open-picture__h4-desc">Описание:</h4>
							<span className="open-picture__span-text">{picture.text}</span>
            </div> */}
          </div>
          <div className="open-picture__order-container">
            <div className="open-picture__price"> {stateAmount >= 10 ? <span className="open-picture__price-sale">{cost} грн</span> : ""}   <span className="open-picture__price-current">{ stateAmount >= 10 ? `${ Math.floor((cost * 0.9))}грн - 10%`  : `${cost} грн`  } </span></div>
						<div className="open-picture__area-size">
							<div className="open-picture__have-size">
								<span className="open-picture__size-span" > Размеры: </span>
								<span className="open-picture__order-container--includes-span open-picture__have-phone">{picture.chart && picture.chart[selectedSize]?.include ? 'Есть в наличии' : ' Нет в наличии'}</span>
							</div>
							<div className="open-picture__chart-container">
								{picture.chart &&
									Object.keys(picture.chart).reverse().filter( el => picture.chart[el].in ).map(( elem, i) => {
										return (
											<div key={i} onClick={() => handleSelectedSizi(elem)} className={`${selectedSize === elem ? 'open-picture__chart--active' : 'open-picture__chart'}`}>
												{elem.toUpperCase()}
											</div>
										)          
									})
								}
							</div>
						</div>
            <span className="open-picture__order-container--includes-span open-picture__have-desctop">{picture.chart && picture.chart[selectedSize]?.include ? 'Есть в наличии' : ' Нет в наличии'}</span>
            <div className="open-picture__buy-container">
              <div className="open-picture__choose-size">
                <button onClick={() => calculate(stateAmount - 1)} className="open-picture__choose-btn" >
                  <Discreate />
                </button>
                <input onBlur={blurCheckCorrect} onInput={inputNewCount} className="open-picture__input-change-count" type="number" name="count" value={stateAmount} maxLength="3"/>
                <button onClick={() => calculate(stateAmount + 1)} className="open-picture__choose-btn open-picture__choose-btn--plus">
                  <Increate />
                </button>
              </div>
              {picture.chart && <button onClick={() => selectedSize ? setToBasket() : alert('Выбирите размер')} className="open-picture__buy-btn"> Заказать </button>}
            </div>
            <div>
              <nav className="open-picture__addition-nav">
                <ul className="open-picture__nav-list">
									<li onClick={() => setStateNavList('Описание')} className={`open-picture__info-action ${stateNavList === 'Описание' ? `open-picture__nav--active` : ' '}`}>Описание</li>
                  <li onClick={() => setStateNavList('Доставка')} className={`open-picture__info-action open-picture__info-delivery ${stateNavList === 'Доставка' ? `open-picture__nav--active` : ' '}`}>Доставка и Оплата</li>
                  {/* <li onClick={() => setStateNavList('Гарантия')} className={`open-picture__info-action--warantry  ${stateNavList === 'Гарантия' ? `open-picture__nav--active` : ' '}`}>Гарантия</li> */}
                </ul>
              </nav>
              <div className="open-picture__conditions">
                {conditions[stateNavList]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
