import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import config from '../../config/default.json';

export const fetchPictures = createAsyncThunk('pictures/fetchPictures', async (activeItem) => {
  const data = axios.get(`${config.serverUrl}/api/pictures/types/${activeItem}`).then(
    res => res.data)
  return data;
});

export const fetchOnePicture = createAsyncThunk('pictures/fetchOnePicture', async (id) => {
  const data = axios.get(`${config.serverUrl}/api/pictures/${id}`).then(
    res => res.data)
  return data;
});

export const fetchTypesOfClothing = createAsyncThunk('pictures/fetchTypes', async () => {
  const data = axios.get(`${config.serverUrl}/api/pictures/categories`).then(
    res => res.data)
  return data;
})

export const setTypesOfClothingRename = createAction('SET_TYPES_OF_CLOTHING')

export const setTypesOfClothing = createAsyncThunk('pictures/setTypesOfClothing', async (obj) => {
  const data = axios.put(`${config.serverUrl}/api/pictures/update/category`,obj).then(
    res => res.data);
  return data;
})

export const setDeleteOfClothing = createAsyncThunk("pictures/setDeleteOfClothing", async (name) => {
	const data = axios.get(`${config.serverUrl}/api/pictures/delete/category/${name}`).then(
		res => res.data)
	return data;
})

export const setPositionCategory = createAsyncThunk("pictures/setPositionCategory", async (obj) => {
	const data = axios.put(`${config.serverUrl}/api/pictures/set/position/category`, obj).then(
		res => res.data)
	return data;
})


export const setStateEdditPicture = createAction('SET_EDDIT_PICTURE')
export const setOrderedGoods = createAction('SET_ORDERED_GOODS')
export const resetOrderedGoods = createAction('RESET_ORDERED_GOODS')
export const setStateType = createAction('SET_STATE_TIPE')
export const refreshOrderedGoods = createAction('DELETE_ORDERED_GOODS')
export const setPicturePreview = createAction('SET_PICTURE_PREVIEW')

