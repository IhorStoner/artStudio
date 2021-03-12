import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderList } from '../../redux/selector/picturesSelector'
import './OrderForm.scss'
import config from '../../config/default.json'
import { ReactComponent as InportantInputSVG } from '../../assets/svg/InportantInput.svg'
import { ReactComponent as DeleteSVG } from '../../assets/svg/basketDelete.svg'

import { ReactComponent as Increate } from '../../assets/svg/increate.svg'
import { ReactComponent as Discreate } from '../../assets/svg/discreate.svg'
import { refreshOrderedGoods } from '../../redux/action/picturesAction'


export const OrderForm = () => {
    const [clientInfo, setClientInfo] = useState({
        initials: '',
        phone: '',
        city: '',
        email: '',
        deliver: '',
        payment: '',
        coment: ''
    })

    function validate(mail) {
        const email = value =>
            value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
                ? 'Invalid email address'
                : undefined
        const phoneNumber = value =>
            value && !/^(0|[1-9][0-9]{9})$/i.test(value)
                ? 'Invalid phone number, must be 10 digits'
                : undefined
    }

    const dispatch = useDispatch()
    const stateOrder = useSelector(getOrderList)

    useEffect(() => {

    }, [stateOrder])

    const onSubmit = (e) => {
        e.preventDefault()
        console.clear()
        console.log(stateOrder)
        console.log(clientInfo)
        // const adId = await axios.post(`${config.serverUrl}/api/pictures`, finnalyData).then(res => setReset())
    }

    const changeHandler = (e) => {
        const { name, value } = e.target

        setClientInfo({ ...clientInfo, [name]: value })
    }

    return (
        <div className='container'>
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
                <div className="order-form__input-container">
                    <div>
                        <label htmlFor="initials">ФИО</label>
                        <input onChange={(e) => changeHandler(e)} className="order-form__input" name="initials" type='text' value={clientInfo.initials} />
                        <InportantInputSVG />
                    </div>
                    <div>
                        <label htmlFor="phone">Телефон</label>
                        <input onChange={(e) => changeHandler(e)} className="order-form__input" name="phone" type='number' value={clientInfo.phone} />
                        <InportantInputSVG />
                    </div>
                    <div>
                        <label htmlFor="city">Город</label>
                        <input onChange={(e) => changeHandler(e)} className="order-form__input" name="city" type='text' value={clientInfo.city} />
                        <InportantInputSVG />
                    </div>
                    <div>
                        <label htmlFor="email">Эл почта</label>
                        <input onChange={(e) => changeHandler(e)} className="order-form__input" name="email" type='number' value={clientInfo.email} />
                        <InportantInputSVG />
                    </div>
                    <div>
                        <label htmlFor='deliver'>Доставка</label>
                        <select onChange={(e) => changeHandler(e)} className="order-form__input--select" name="deliver" value={clientInfo.deliver}>
                            <option>Новая Почта</option>
                            <option>Интайм</option>
                            <option>Укрпочта</option>
                            <option>Самовывоз</option>
                        </select>
                        <InportantInputSVG />
                    </div>
                    <div>
                        <label htmlFor='payment'>Оплата</label>
                        <select onChange={(e) => changeHandler(e)} className="order-form__input--select" name='payment' value={clientInfo.payment}>
                            <option className="order-form__option" value="Наличными" >Наличными</option>
                            <option className="order-form__option" value="Карточкой" >На карту (предоплата)</option>
                            <option className="order-form__option" value="Карточкой" >На карту (полная оплата)</option>
                            <option className="order-form__option" value="Карточкой" >Онлайн оплата</option>
                        </select>
                        <InportantInputSVG />
                    </div>
                    <div>
                        <label htmlFor='coment'>Комментарий к заказу</label>
                        <input onChange={(e) => changeHandler(e)} className="order-form__textarea" name='coment' type='textarea' value={clientInfo.coment} />
                    </div>
                </div>
                <div className="order-form__goods-container">
                    <div className="order-form__cards-container">
                        {stateOrder.map((elem, i) => (
                            <div key={i} className='order-form__card-goods'>
                                <img className='order-form__card-goods--img' src={`${config.serverUrl}/api/images/${elem.image}`}></img>
                                <div className='order-form__card-goods--info'>
                                    <span>
                                        <p>{elem.title}</p>
                                        <p>Размер - {elem.size?.toUpperCase()}</p>
                                    </span>
                                    <div className="order-form__choose-size">
                                        {/* <button className="order-form__choose-btn" > */}
                                        <button
                                            className="order-form__choose-btn"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                elem.amount > 1 && dispatch(refreshOrderedGoods(stateOrder.map(
                                                    el => el._id === elem._id ? { ...el, amount: el.amount - 1, price: el.amount * el.price } : el
                                                )))
                                            }}
                                        >
                                            <Discreate />
                                        </button>
                                        {elem.amount}
                                        {/* <button className="order-form__choose-btn"> */}
                                        <button
                                            className="order-form__choose-btn"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                dispatch(refreshOrderedGoods(stateOrder.map(
                                                    el => el._id === elem._id ? { ...el, amount: el.amount + 1 } : el
                                                )))
                                            }}
                                        >
                                            <Increate />
                                        </button>
                                    </div>
                                </div>
                                <div className='order-form__card-goods--amount'>
                                    <DeleteSVG onClick={() => { dispatch(refreshOrderedGoods(stateOrder.filter(el => el._id !== elem._id))); console.log(elem._id) }} />
                                    <p>{elem.price} грн</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="order-form__card-goods--total">
                        <span>Итог </span> {stateOrder.reduce((accum, elem) => { return accum + (elem.price * elem.amount) }, 0)}
                    </div>
                </div>
                <div className='order-form__foot'> <button onClick={(e) => { onSubmit(e) }}>Оформить заказ</button></div>
            </form>
        </div>
    )
}
