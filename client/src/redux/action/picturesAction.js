import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import config from '../../config/default.json'

export const fetchPictures = createAsyncThunk('pictures/fetchPictures', async (activeItem) => {
  const data = axios.get(`${config.serverUrl}/api/pictures/${activeItem}`).then(
    res => res.data)
  return data;
});