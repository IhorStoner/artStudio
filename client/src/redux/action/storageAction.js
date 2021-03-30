import { createAction } from "@reduxjs/toolkit"

export const addProduct = createAction('ADD_PRODUCT_TO_CART')
export const removeProduct = createAction('REMOVE_PRODUCT_FROM_CART')
export const rewriteOrderItem = createAction('REWRITE_ORDER_ITEM')
export const setEmptyBasket = createAction('SET_EMPTY_BASKET')
export const writeAndReplaceBasket = createAction('WRITE_AND_REPLACE_BASKET')