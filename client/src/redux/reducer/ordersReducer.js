import { createReducer } from "@reduxjs/toolkit";
import { fetchOrders, setIndexOfList } from "../action/orderAction";

const initialState = {
    loading: false,
    data: [],
    error: [],
    orders: [],
    indexOfList: null
};

const ordersReducer = createReducer(initialState, {

    [fetchOrders.fulfilled]: (state, action) => {
        state.orders = action.payload;
        state.loading = false;
    },
    [fetchOrders.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    [fetchOrders.pending]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    [setIndexOfList.type]: (state, action) => {
        state.indexOfList = action.payload
    },
});

export default ordersReducer