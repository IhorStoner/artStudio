import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../../redux/action/orderAction'
import { getOrdersList } from '../../redux/selector/ordersSelector'

import './OrdersList.scss'


export const OrdersList = () => {
    const dispatch = useDispatch()
    const orders = useSelector(getOrdersList)
    useEffect(() => {
        dispatch(fetchOrders())
    }, [])


    console.log(orders)
    return (
        <div className="container">
            <div className="order-list">
                <div className='order-list__orders-header'>
                    <div>Номер заказа</div>
                    <div>Сумма</div>
                    <div>Время и дата оформления</div>
                    <div>Текущий статус</div>
                </div>
                {orders.map(order => {
                    let date = new Date(order.orderNumber * 1000).toString().slice(7, 24)

                    return (
                        <div className='order-list__options-list'>
                            <div className="order-list__orders-container--options"><center>{order.orderNumber}</center></div>
                            <div>{order.price}</div>
                            <div>{date.toString()}</div>
                            <div>{order.status}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}