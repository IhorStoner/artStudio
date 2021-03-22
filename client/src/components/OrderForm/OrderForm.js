import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStateOrder } from '../../redux/selector/picturesSelector'
import './OrderForm.scss'
import config from '../../config/default.json'
import { ReactComponent as InportantInputSVG } from '../../assets/svg/InportantInput.svg'
import axios from 'axios'
import { useHistory } from 'react-router'
import { setEmptyBasket } from '../../redux/action/storageAction'
import { GoodsContainer } from './GoodsContainer'

export const OrderForm = () => {
    const dispatch = useDispatch()
    const stateOrder = useSelector(getStateOrder)
    const [confirm, setConfirm] = useState(false)
    const { push } = useHistory()
    const [clientInfo, setClientInfo] = useState({
        initials: '',
        phone: '+380',
        city: '',
        email: '',
        deliver: 'Новая Почта',
        payment: 'Наличными',
        comment: ''
    })
    const [touchedControll, setTouchedControll] = useState({
        email: { touched: false, isValid: false },
        phone: { touched: false, isValid: false }
    })

    const onValid = (name, value) => {
        if (name === 'email') {
            return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
                ? false
                : true
        }

        if (name === 'phone') {
            return value.length !== 13
                ? false
                : true
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const model = {
            comment: clientInfo.comment,
            price: stateOrder.reduce((accum, elem) => { return accum + (elem.price * elem.amount) }, 0),
            clothes: stateOrder,
            orderNumber: parseInt(+new Date() / 1000),
            status: 'Новый',
            client: clientInfo
        }
        const adId = await axios.post(`${config.serverUrl}/api/order`, model).then(res => console.log(res.data))
        setConfirm(model.orderNumber)

    }

    const onValidHandler = (name, value) => {
        setTouchedControll({ ...touchedControll, [name]: { touched: true, isValid: onValid(name, value) } })
    }
    const changeHandler = (e) => {
        const { name, value } = e.target
        setClientInfo({ ...clientInfo, [name]: value })
        onValidHandler(name, value)
    }

    const check = (first, second) => {
        return first && second ? true : !first && !second ? true : false
    }

    const validField = (name) => {
        const { touched, isValid } = touchedControll[name]
        return check(touched, isValid)
    }

    return (
        <div className='container'>
            {confirm && <div className='order-form__popup'>
                <div className='order-form__modal'>Ваш заказ (№ {confirm}) принят, в ближайшее время с вами свяжется оператор.<div>
                    <button onClick={() => { setConfirm(false); push('/home/works'); dispatch(setEmptyBasket([])) }}> Хорошо </button>
                </div>
                </div>
            </div>}
            <div className="order-form__head">Оформление заказа</div>
            <div className="order-form__label">
                <div>
                    <span>Получатель заказа</span>
                </div>
                <div>
                    <span>Ваш заказ</span>
                </div>
            </div>
            <form className="order-form">
                <div className="order-form--main">
                    <div className="order-form__input-container">
                        <div>
                            <label htmlFor="initials">ФИО</label>
                            <input
                                onChange={(e) => changeHandler(e)}
                                className="order-form__input"
                                name="initials"
                                type='text'
                                value={clientInfo.initials}
                            />
                            <InportantInputSVG />
                        </div>
                        <div>
                            <label htmlFor="phone">Телефон</label>
                            <input
                                onChange={(e) => changeHandler(e)}
                                className={`order-form__input${!validField('phone') ? '--warning' : ' '}`}
                                name="phone" type='phone'
                                value={clientInfo.phone}
                            />
                            <InportantInputSVG />
                        </div>
                        <div>
                            <label htmlFor="city">Город</label>
                            <input
                                onChange={(e) => changeHandler(e)}
                                className="order-form__input"
                                name="city" type='text'
                                value={clientInfo.city}
                            />
                            <InportantInputSVG />
                        </div>
                        <div>
                            <label htmlFor="email">Эл почта</label>
                            <input
                                onChange={(e) => changeHandler(e)}
                                className={`order-form__input${!validField('email') ? '--warning' : ' '}`}
                                name="email" type='text'
                                value={clientInfo.email}
                            />
                            <InportantInputSVG />
                        </div>
                        <div>
                            <label htmlFor='deliver'>Доставка</label>
                            <select onChange={(e) => changeHandler(e)}
                                className="order-form__input--select"
                                name="deliver"
                                value={clientInfo.deliver}
                            >
                                <option>Новая Почта</option>
                                <option>Интайм</option>
                                <option>Укрпочта</option>
                                <option>Самовывоз</option>
                            </select>
                            <InportantInputSVG />
                        </div>
                        <div>
                            <label htmlFor='payment'>Оплата</label>
                            <select
                                onChange={(e) => changeHandler(e)}
                                className="order-form__input--select"
                                name='payment'
                                value={clientInfo.payment}
                            >
                                <option value="Наличными" >Наличными</option>
                                <option value="На карту (предоплата)" >На карту (предоплата)</option>
                                <option value="На карту (полная оплата)" >На карту (полная оплата)</option>
                                <option value="Онлайн оплата" >Онлайн оплата</option>
                            </select>
                            <InportantInputSVG />
                        </div>
                        <div>
                            <label htmlFor='comment'>Комментарий к заказу</label>
                            <textarea
                                onChange={(e) => changeHandler(e)}
                                className="order-form__textarea"
                                name='comment' type='textarea'
                                value={clientInfo.comment}
                            ></textarea >
                        </div>
                    </div>
                    <GoodsContainer />
                </div>
                <div className='order-form__foot'> <button onClick={(e) => { onSubmit(e) }}>Оформить заказ</button></div>
            </form>
        </div>
    )
}
