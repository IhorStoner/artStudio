import React from 'react'
import { Field, reduxForm } from 'redux-form'
import './OrderForm.scss'
import config from '../../config/default.json'
import { ReactComponent as InportantInputSVG } from '../../assets/svg/InportantInput.svg'
import { ReactComponent as DeleteSVG } from '../../assets/svg/basketDelete.svg'

import { ReactComponent as Increate } from '../../assets/svg/increate.svg'
import { ReactComponent as Discreate } from '../../assets/svg/discreate.svg'
import { refreshOrderedGoods } from '../../redux/action/picturesAction'
import TextField from './TextField'



let ContactForm = props => {
    const { handleSubmit, pristine, submitting } = props

    return (
        <form onSubmit={handleSubmit} className="order-form">
            <div className="order-form__input-container">
                <div>
                    <label htmlFor="initials">ФИО</label>
                    <Field className="order-form__input" component={TextField} name="initials" type='text' />
                    <InportantInputSVG />
                </div>
                <div>
                    <label htmlFor="phone">Телефон</label>
                    <Field component={TextField} className="order-form__input" name="phone" type='number' />
                    <InportantInputSVG />
                </div>
                <div>
                    <label htmlFor="city">Город</label>
                    <Field component={TextField} className="order-form__input" name="city" type='text' />
                    <InportantInputSVG />
                </div>
                <div>
                    <label htmlFor="email">Эл почта</label>
                    <Field component={TextField} className="order-form__input" name="email" type='email' />
                    <InportantInputSVG />
                </div>
                <div>
                    <label htmlFor='deliver'>Доставка</label>
                    <Field component="select" className="order-form__input--select" name="deliver">
                        <option className="order-form__option">Новая Почта</option>
                        <option className="order-form__option">Интайм</option>
                        <option className="order-form__option">Укрпочта</option>
                        <option className="order-form__option">Самовывоз</option>
                    </Field>
                    <InportantInputSVG />
                </div>
                <div>
                    <label htmlFor='payment'>Оплата</label>
                    <select component="select" className="order-form__input--select" name='payment'>
                        <option className="order-form__option" value="Наличными" >Наличными</option>
                        <option className="order-form__option" value="Карточкой" >На карту (предоплата)</option>
                        <option className="order-form__option" value="Карточкой" >На карту (полная оплата)</option>
                        <option className="order-form__option" value="Карточкой" >Онлайн оплата</option>
                    </select>
                    <InportantInputSVG />
                </div>
                <div>
                    <label htmlFor='coment'>Комментарий к заказу</label>
                    <input component={TextField} className="order-form__textarea" name='coment' type='textarea' />
                </div>
            </div>

            <div className='order-form__foot'> <button type="submit" disabled={pristine || submitting}>Оформить заказ</button></div>
        </form>
    )
}
ContactForm = reduxForm({
    // a unique name for the form
    form: 'contact'
})(ContactForm)

export default ContactForm



//  <div className="order-form__goods-container">
//                 <div className="order-form__cards-container">
//                     {stateOrder.map((elem, i) => (
//                         <div key={i} className='order-form__card-goods'>
//                             <img className='order-form__card-goods--img' src={`${config.serverUrl}/api/images/${elem.image}`}></img>
//                             <div className='order-form__card-goods--info'>
//                                 <span>
//                                     <p>{elem.title}</p>
//                                     <p>Размер - {elem.size?.toUpperCase()}</p>
//                                 </span>
//                                 <div className="order-form__choose-size">
// <button className="order-form__choose-btn" 
//                                     <button
//                                         className="order-form__choose-btn"
//                                         onClick={(e) => {
//                                             e.preventDefault();
//                                             elem.amount > 1 && dispatch(refreshOrderedGoods(stateOrder.map(
//                                                 el => el._id === elem._id ? { ...el, amount: el.amount - 1, price: el.amount * el.price } : el
//                                             )))
//                                         }}
//                                     >
//                                         <Discreate />
//                                     </button>
//                                     {elem.amount}
//                                     {/* <button className="order-form__choose-btn"> */}
//                                     <button
//                                         className="order-form__choose-btn"
//                                         onClick={(e) => {
//                                             e.preventDefault();
//                                             dispatch(refreshOrderedGoods(stateOrder.map(
//                                                 el => el._id === elem._id ? { ...el, amount: el.amount + 1 } : el
//                                             )))
//                                         }}
//                                     >
//                                         <Increate />
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className='order-form__card-goods--amount'>
//                                 <DeleteSVG onClick={() => { dispatch(refreshOrderedGoods(stateOrder.filter(el => el._id !== elem._id))); console.log(elem._id) }} />
//                                 <p>{elem.price} грн</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="order-form__card-goods--total">
//                     <span>Итог </span> {stateOrder.reduce((accum, elem) => { return accum + (elem.price * elem.amount) }, 0)}
//                 </div>
//             </div> 