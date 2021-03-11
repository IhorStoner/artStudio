import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import config from '../../config/default.json'

export const fetchPictures = createAsyncThunk('pictures/fetchPictures', async (activeItem) => {
  const data = axios.get(`${config.serverUrl}/api/pictures/${activeItem}`).then(
    res => res.data)
  return data;
});

export const fetchOnePicture = createAsyncThunk('pictures/fetchOnePicture', async (id) => {
  const data = axios.get(`${config.serverUrl}/api/pictures/${id}`).then(
    res => res.data)
  return data;
});

export const setStateEdditPicture = createAction('SET_EDDIT_PICTURE')
export const setOrderedGoods = createAction('SET_ORDERED_GOODS')
export const setStateTipe = createAction('SET_STATE_TIPE')
export const deleteOrderedGoods = createAction('DELETE_ORDERED_GOODS')