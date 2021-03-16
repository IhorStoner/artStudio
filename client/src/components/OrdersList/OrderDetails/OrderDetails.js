import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getIndexOfList, getOrdersList } from '../../../redux/selector/ordersSelector'
import './OrderDetails.scss'

import config from '../../../config/default.json'
import axios from 'axios'
import { fetchOrders, setIndexOfList } from '../../../redux/action/orderAction'

export const OrderDetails = () => {
    const orders = useSelector(getOrdersList)
    const [stateStatus, setStateStatus] = useState()
    const [deleteCurrentOrder, setDeleteCurrentOrder] = useState(false)
    const indexOfList = useSelector(getIndexOfList)
    const order = orders[indexOfList - 1]
    const dispatch = useDispatch()

    const deleteOrder = async () => {
        await axios.delete(`${config.serverUrl}/api/order/${order.orderNumber}`).then(res => { dispatch(fetchOrders()); dispatch(setIndexOfList(null)) })
    }

    const changeStatus = async () => {
        if (!stateStatus) { return }
        await axios.put(`${config.serverUrl}/api/order/${order._id}`, { status: stateStatus }).then(res => { dispatch(fetchOrders()); dispatch(setIndexOfList(indexOfList)) })
    }



    return (
        <div className="container">
            {deleteCurrentOrder && <div className='order-details__popup'>
                <div className='order-details__modal'>Вы действительно хотите удалить этот заказ?
                        <div>
                        <button onClick={() => { deleteOrder(); setDeleteCurrentOrder(false) }}>Да, удалить</button>
                        <button onClick={() => setDeleteCurrentOrder(false)}>Нет, оставить</button>
                    </div>
                </div>
            </div>}
            <div className="order-details">
                <div className="order-details__header">
                    <span>Заказ: {order.orderNumber}</span>
                    <span>{order.status}</span>
                    <div className="order-details__header--status">
                        <button className="order-details__button" onClick={() => changeStatus()}>Сменить статус</button>
                        <select defaultChecked={order.status} onChange={(e) => setStateStatus(e.target.value)}>
                            <option>Новый</option>
                            <option> В работе</option>
                            <option>Отменён</option>
                            <option>Выполнен</option>
                            <option>Доставляется</option>
                        </select>
                    </div>
                </div>
                <div className="order-details__main-container">
                    <div className="order-details__client-info" >
                        <div className="order-details__client-info--option" >
                            <div>ФИО</div><div>{order.client.initials}</div>
                        </div>
                        <div className="order-details__client-info--option" >
                            <div>Телефон</div> <div>{order.client.phone}</div>
                        </div>
                        <div className="order-details__client-info--option" >
                            <div>Город</div><div>{order.client.city}</div>
                        </div>
                        <div className="order-details__client-info--option" >
                            <div>Эл. почта</div><div>{order.client.email}</div>
                        </div>
                        <div className="order-details__client-info--option" >
                            <div>Доставка</div><div>{order.client.deliver}</div>
                        </div>
                        <div className="order-details__client-info--option" >
                            <div>Оплата</div><div>{order.client.payment}</div>
                        </div>
                        <div className="order-details__client-info--option" >
                            <div>Комментарий к заказу</div><div>{order.client.comment}</div>
                        </div>
                        <button className="order-details__button" onClick={() => setDeleteCurrentOrder(true)} >Удалить заказ</button>
                    </div>
                    <div className="order-details__goods-info" >
                        {order.clothes.map((elem, i) => (
                            <div key={i} className='order-details__card-goods'>
                                <img className='order-details__card-goods--img' src={`${config.serverUrl}/api/images/${elem.image}`}></img>
                                <div className='order-details__card-goods--info'>
                                    <span>
                                        <p>{elem.title}</p>
                                        <p>Размер - {elem.size?.toUpperCase()}</p>
                                    </span>
                                </div>
                                <div className='order-details__card-goods--info'><span>{elem.amount} шт. ({elem.price} грн)</span></div>
                            </div>
                        ))}
                        <div className="order-details__goods-info--total"><span>Итог</span> <h3>{order.clothes.reduce((accum, elem) => { return accum + (elem.price * elem.amount) }, 0)}</h3></div>
                    </div>
                </div>
                <div className="order-details__footer"><center><button className="order-details__button" onClick={() => dispatch(setIndexOfList(null))}>Сохранить</button></center></div>
            </div>
        </div>
    )
}