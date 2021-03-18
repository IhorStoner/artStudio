import { createReducer } from "@reduxjs/toolkit";
import { addProduct, removeProduct, rewriteOrderItem } from "../action/storageAction";

let initialState;

try {
    initialState = JSON.parse(localStorage.getItem('orderList') || "[]")
} catch (e) {
    console.log('Local storage is empty')
}

export const storageReducer = createReducer(initialState, {
    [addProduct.type]: (state, action) => {
        state.push(action.payload)
    },
    [removeProduct.type]: (state, action) => {
        const basketProductIndex = state.findIndex(cartProduct => cartProduct._id === action.payload);
        state.splice(basketProductIndex, 1);
    },
    [rewriteOrderItem.type]: (state, action) => {
        const basketClothesIndex = state.findIndex(clothes => clothes._id == action.payload._id)
        state.splice(basketClothesIndex, 1, action.payload)
    }
});

export default storageReducer;