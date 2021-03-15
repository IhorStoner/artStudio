import { createSelector } from '@reduxjs/toolkit'

export const getOrders = createSelector(
    state => state.order.orders,
    orders => orders
);
export const getOrdersList = createSelector(
    state => state.order.orders,
    stateOrder => stateOrder
)
