import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import config from '../../config/default.json'


export const fetchOrders = createAsyncThunk('pictures/fetchOrders', async () => {
    const data = axios.get(`${config.serverUrl}/api/order`).then(
        res => res.data
    )

    return data
})

// export const setTypesOfClothing = createAction('SET_TYPES_OF_CLOTHING')
// export const setStateEdditPicture = createAction('SET_EDDIT_PICTURE')
// export const setOrderedGoods = createAction('SET_ORDERED_GOODS')
// export const setStateType = createAction('SET_STATE_TIPE')
// export const refreshOrderedGoods = createAction('DELETE_ORDERED_GOODS')