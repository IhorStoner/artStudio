import React, { useEffect, useState } from 'react'
import './OpenPicture.scss'
import OpenPictureSlider from '../OpenPictureSlider/OpenPictureSlider'
import { ReactComponent as Increate } from '../../assets/svg/increate.svg'
import { ReactComponent as Discreate } from '../../assets/svg/discreate.svg'
import { ReactComponent as BasketDelete } from '../../assets/svg/basketDelete.svg'
import { ReactComponent as BtnClose } from '../../assets/svg/btnClose.svg'
import config from '../../config/default.json'
import { useHistory } from 'react-router'
import { setOrderedGoods } from '../../redux/action/picturesAction'
import { useDispatch, useSelector } from 'react-redux'
import { getStateOrder } from '../../redux/selector/picturesSelector'
import { addProduct, rewriteOrderItem } from '../../redux/action/storageAction'
import { GoodsContainer } from './GoodsContainer'


const conditions = {
  "Доставка": "Условия доставки  ".repeat(20),
  "Оплата": "Способы оплаты  ".repeat(20),
  "Гарантия": "Наша качества ".repeat(20)
}

export default function OpenPicture({ picture }) {
  const [stateAmount, setStateAmount] = useState(1)
  const [stateNavList, setStateNavList] = useState('Доставка')
  const [selectedSize, setSelectedSize] = useState(null)
  const [sentToBasket, setSentToBasket] = useState(false)
  const { push } = useHistory()
  const dispatch = useDispatch()
  const stateOrder = useSelector(getStateOrder)

  const handleSelectedSizi = (elem) => {
    setSelectedSize(elem)
  }

  useEffect(() => {
    picture.chart && setSelectedSize(Object.keys(picture.chart)[0])
  }, [picture.chart])

  const setToBasket = () => {
    setSentToBasket(true)
    if (stateAmount < 1) { alert('укажите количество товара'); return }
    const { price, _id, vendorCode, images, title } = picture
    const checkId = stateOrder.findIndex(elem => elem._id === _id)

    if (checkId !== -1) {

      dispatch(rewriteOrderItem({ amount: stateAmount, title, size: selectedSize, price, _id, vendorCode, image: images[0] }))
        ; return
    }
    dispatch(addProduct({ amount: stateAmount, title, size: selectedSize, price, _id, vendorCode, image: images[0] }))
    // dispatch(setOrderedGoods({ amount: stateAmount, title, size: selectedSize, price, _id, vendorCode, image: images[0] }))
  }

  return (
    <div className='container'>
      {
        sentToBasket && <div className="sent-to-basket">
          <div className="sent-to-basket__form">
            <div className="sent-to-basket__head">
              <h2>Корзина</h2>
              <div> <span>Количество</span> <span>Стоимость</span></div>
              <BtnClose className="sent-to-basket__btn-close" onClick={() => setSentToBasket(false)} />
            </div>
            <div className="sent-to-basket__main">
              <GoodsContainer />
            </div>
            <div className='sent-to-basket__foot'>
              <button onClick={() => { push('/home/') }}> Вернуться к покупкам </button>
              <button onClick={() => { push('/home/orderForm') }}> Оформить заказ </button>
            </div>
          </div>
        </div>
      }
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
                  (elem, i) => {
                    return (picture.chart[elem].in ?
                      <div
                        key={i}
                        onClick={() => handleSelectedSizi(elem)}
                        className={`open-picture__chart${selectedSize === elem ? '--active' : ''}`}
                      >
                        {elem.toUpperCase()}
                      </div> : null)
                  })
              }
            </div>
            <span className="open-picture__order-container--includes-span">{picture.chart && picture.chart[selectedSize]?.include ? 'Есть в наличии' : ' Нет в наличии'}</span>
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
              {picture.chart && <button disabled={!picture.chart[selectedSize]?.include} onClick={() => selectedSize ? setToBasket() : alert('Выбирите размер')} className="open-picture__buy-btn"> Купить </button>}
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
