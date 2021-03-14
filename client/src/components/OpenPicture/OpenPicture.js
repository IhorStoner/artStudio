import React, { useEffect, useState } from 'react'
import './OpenPicture.scss'
import OpenPictureSlider from '../OpenPictureSlider/OpenPictureSlider'
import { ReactComponent as Increate } from '../../assets/svg/increate.svg'
import { ReactComponent as Discreate } from '../../assets/svg/discreate.svg'
import { ReactComponent as BasketDelete } from '../../assets/svg/basketDelete.svg'
import config from '../../config/default.json'
import { useHistory } from 'react-router'
import { setOrderedGoods } from '../../redux/action/picturesAction'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderList } from '../../redux/selector/picturesSelector'


const conditions = {
  "Доставка": ' доставка доставка доставка доставка доставка доставка доставка доставка доставка доставка доставка доставка доставка доставка доставка доставка доставка доставка доставка доставка <br/> ljljljljljl',
  "Оплата": 'оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата оплата ',
  "Гарантия": " Гарантия гарантия Гарантия гарантия Гарантия гарантия Гарантия гарантия Гарантия гарантия Гарантия гарантия Гарантия гарантия Гарантия гарантия Гарантия гарантия Гарантия гарантия Гарантия гарантия "
}

export default function OpenPicture({ picture }) {
  const [stateAmount, setStateAmount] = useState(1)
  const [stateNavList, setStateNavList] = useState('Доставка')
  const [selectedSize, setSelectedSize] = useState(null)
  const [sentToBasket, setSentToBasket] = useState(false)
  const { push } = useHistory()
  const dispatch = useDispatch()
  const stateOrder = useSelector(getOrderList)


  useEffect(() => {
    picture.chart && setSelectedSize(Object.keys(picture.chart)[0])
  }, [picture.chart])

  const setToBasket = () => {
    if (stateAmount < 1) { alert('укажите количество товара'); return }
    const { price, _id, vendorCode, images, title } = picture
    const checkId = stateOrder.findIndex(elem => elem._id === _id)

    if (checkId !== -1) { alert('эта позиция уже есть в корзине '); return }

    dispatch(setOrderedGoods({ amount: stateAmount, title, size: selectedSize, price, _id, vendorCode, image: images[0] }))
  }

  return (
    <div className='container'>
      {sentToBasket && <div className="sent-to-basket">
        <div className="sent-to-basket__form">
          <div className="sent-to-basket__head"><h2>Корзина</h2> <div> <span>Количество</span> <span>Стоимость</span></div></div>
          <div className="sent-to-basket__main">
            <div className="sent-to-basket__diskribe-image">
              {picture.images && <img src={`${config.serverUrl}/api/images/${picture.images[0]}`} className="sent-to-basket__img"></img >}
              <div>
                <p>
                  {picture.title}
                </p>
                <p>
                  Размер - {selectedSize.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="sent-to-basket__acive-side">
              <div className="sent-to-basket__acive-side--head">
                <div className="sent-to-basket__choose-size">
                  <button onClick={() => stateAmount > 1 && setStateAmount(stateAmount - 1)} className="open-picture__choose-btn" >
                    <Discreate />
                  </button>
                  {stateAmount}
                  <button onClick={() => setStateAmount(stateAmount + 1)} className="open-picture__choose-btn">
                    <Increate />
                  </button>
                </div>
                <span> {picture.price} грн</span>
                <BasketDelete className="sent-to-basket__basket" onClick={() => { setSentToBasket(false); setSelectedSize(''); setStateAmount(0) }} />
              </div>
              <div className="sent-to-basket__acive-side--foot">
                <span> Итог </span>  {picture.price * stateAmount} грн
              </div>
            </div>
          </div>
          <div className='sent-to-basket__foot'>
            <button onClick={() => { push('/home/works') }}> Вернуться к покупкам </button>
            <button onClick={() => { setToBasket(); push('/home/orderForm') }}> Оформить заказ </button>
          </div>
        </div>
      </div>}
      <div className="open-picture">
        <div className="open-picture__articul">
          {picture.title}
          <span>Артикул {picture.vendorCode}</span>
        </div>
        <div className="open-picture__main">
          <div className="open-picture__slider-container">
            <div className="open-picture__slider">
              {picture.images && <OpenPictureSlider imgArr={picture.images} thumbs={true} />}
            </div>
            <div className="open-picture__discribe">
              Описание: <br />
              {picture.text}
            </div>
          </div>
          <div className="open-picture__order-container">
            <h2 className="open-picture__price"> {picture.price} грн </h2>
            <span> Размеры: <br /></span>
            <div className="open-picture__chart-container">
              {picture.chart &&
                Object.keys(picture.chart).map(
                  (elem, i) => picture.chart[elem] &&
                    <div
                      key={i}
                      onClick={() => setSelectedSize(elem)}
                      className={`open-picture__chart${selectedSize === elem ? '--active' : ' '}`}
                    >
                      {elem.toUpperCase()}
                    </div>)
              }
            </div>
            <span>Есть в наличии</span>
            <div className="open-picture__buy-container">
              <div className="open-picture__choose-size">
                <button onClick={() => setStateAmount(stateAmount - 1)} className="open-picture__choose-btn" >
                  <Discreate />
                </button>
                {stateAmount}
                <button onClick={() => setStateAmount(stateAmount + 1)} className="open-picture__choose-btn">
                  <Increate />
                </button>
              </div>
              <button onClick={() => selectedSize ? setSentToBasket(true) : alert('Выбирите размер')} className="open-picture__buy-btn"> Купить </button>
            </div>
            <div>
              <nav className="open-picture__nav">
                <ul>
                  <li onClick={() => setStateNavList('Доставка')} className={stateNavList === 'Доставка' ? `open-picture__nav--active` : ' '}>Доставка</li>
                  <li onClick={() => setStateNavList('Оплата')} className={stateNavList === 'Оплата' ? `open-picture__nav--active` : ' '}>Оплата</li>
                  <li onClick={() => setStateNavList('Гарантия')} className={stateNavList === 'Гарантия' ? `open-picture__nav--active` : ' '}>Гарантия</li>
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
