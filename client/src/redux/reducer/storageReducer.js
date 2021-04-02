import { createReducer } from "@reduxjs/toolkit";
import { addProduct, removeProduct, rewriteOrderItem, setEmptyBasket, writeAndReplaceBasket } from "../action/storageAction";

let initialState;

try {
    initialState = JSON.parse(localStorage.getItem('orderList')) || "[]"
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
        const things = action.payload;
        const basketClothesIndex = state.findIndex(clothes => { return things.size === clothes.size && clothes._id === action.payload._id});
        state.splice(basketClothesIndex, 1, action.payload)
    },
    [setEmptyBasket.type]: (state, action) => {
        state.splice(0, state.length)
    },
    // [writeAndReplaceBasket.type]: (state, action) => {
	// 		console.log(state.target)
    //   state = action.payload
    // }
});

export default storageReducer;