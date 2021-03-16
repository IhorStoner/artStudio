import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, setIndexOfList } from '../../redux/action/orderAction'
import { getIndexOfList, getOrdersList } from '../../redux/selector/ordersSelector'

import './OrdersList.scss'
import { OrderDetails } from './OrderDetails/OrderDetails'


export const OrdersList = () => {
    const dispatch = useDispatch()
    const orders = useSelector(getOrdersList)
    const indexOfList = useSelector(getIndexOfList)

    useEffect(() => {
        dispatch(fetchOrders())
    }, [])

    if (indexOfList) {
        return <OrderDetails />
    }

    return (
        <div className="container">
            <div className="order-list">
                <div className='order-list__orders-header'>
                    <div>Номер заказа</div>
                    <div>Сумма</div>
                    <div>Время и дата оформления</div>
                    <div>Текущий статус</div>
                </div>
                {orders.map((order, i) => {
                    let date = new Date(order.orderNumber * 1000).toString().slice(3, 24)
                    return (
                        <div onClick={() => dispatch(setIndexOfList(i + 1))} className='order-list__options-list'>
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