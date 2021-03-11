import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderList } from '../../redux/selector/picturesSelector'
import './OrderForm.scss'
import config from '../../config/default.json'
import { ReactComponent as InportantInputSVG } from '../../assets/svg/InportantInput.svg'
import { ReactComponent as DeleteSVG } from '../../assets/svg/basketDelete.svg'

import { ReactComponent as Increate } from '../../assets/svg/increate.svg'
import { ReactComponent as Discreate } from '../../assets/svg/discreate.svg'
import { deleteOrderedGoods } from '../../redux/action/picturesAction'


export const OrderForm = () => {


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

    return (
        <div className='container'>
            <div className="order-form__head">Оформление заказа</div>
            <form className="order-form">
                <div className="order-form__input-container">
                    <p>Получатель заказа</p>
                    <div>
                        <label htmlFor="customer">ФИО</label>
                        <input className="order-form__input" name="customer" type='text' />
                        <InportantInputSVG />
                    </div>
                    <div>
                        <label htmlFor="phone">Телефон</label>
                        <input className="order-form__input" name="phone" type='number' />
                        <InportantInputSVG />
                    </div>
                    <div>
                        <label htmlFor="city">Город</label>
                        <input className="order-form__input" name="city" type='text' />
                        <InportantInputSVG />
                    </div>
                    <div>
                        <label htmlFor="email">Эл почта</label>
                        <input className="order-form__input" name="email" type='number' />
                        <InportantInputSVG />
                    </div>
                    <div>
                        <label htmlFor='deliver'>Доставка</label>
                        <select className="order-form__input" name="deliver">
                            <option></option>
                            <option>Новой почтой</option>
                            <option>Самовывоз</option>
                        </select>
                        <InportantInputSVG />
                    </div>
                    <div>
                        <label htmlFor='payment'>Оплата</label>
                        <select className="order-form__input" name='payment'>
                            <option value="Наличными" ></option>
                            <option value="Наличными" >Наличными</option>
                            <option value="Карточкой" >Карточкой</option>
                        </select>
                        <InportantInputSVG />
                    </div>
                    <div>
                        <label htmlFor='coment'>Комментарий к заказу</label>
                        <input className="order-form__textarea" name='comemt' type='textarea' />
                    </div>
                </div>
                <div className="order-form__goods-container">
                    <div><p>Ваш заказ</p></div>
                    {stateOrder.map((elem, i) => (
                        <div key={i} className='order-form__card-goods'>
                            <img className='order-form__card-goods--img' src={`${config.serverUrl}/api/images/${elem.image}`}></img>
                            <div className='order-form__card-goods--info'>
                                <span>
                                    <p>{elem.title}</p>
                                    <p>Размер - {elem.size.toUpperCase()}</p>
                                </span>
                                <div className="order-form__choose-size">
                                    <button onClick={() => { }} className="order-form__choose-btn" >
                                        <Discreate />
                                    </button>
                                    {elem.amount}
                                    <button onClick={() => { }} className="order-form__choose-btn">
                                        <Increate />
                                    </button>
                                </div>
                            </div>
                            <div className='order-form__card-goods--amount'>
                                <DeleteSVG onClick={() => { dispatch(deleteOrderedGoods(stateOrder.filter(el => el._id !== elem._id))); console.log(elem._id) }} />
                                <p>{elem.price} грн</p>
                            </div>
                        </div>
                    ))}
                    <div className="order-form__card-goods--total">
                        <span>Итог </span> {stateOrder.reduce((accum, elem) => { return accum + (elem.price * elem.amount) }, 0)}
                    </div>
                </div>
                <div className='order-form__foot'> <button>Оформить заказ</button></div>
            </form>
        </div>
    )
}
