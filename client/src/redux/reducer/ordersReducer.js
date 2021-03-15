import { createReducer } from "@reduxjs/toolkit";
import { fetchOrders } from "../action/orderAction";

const initialState = {
    loading: false,
    data: [],
    error: [],
    orders: []
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

});

export default ordersReducer