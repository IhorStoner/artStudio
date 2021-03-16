import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import config from '../../config/default.json'


export const fetchOrders = createAsyncThunk('pictures/fetchOrders', async () => {
    const data = axios.get(`${config.serverUrl}/api/order`).then(
        res => res.data
    )
    return data
})
export const setIndexOfList = createAction('SET_INDEX_OF_LIST')