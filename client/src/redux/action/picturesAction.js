import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import config from '../../config/default.json'

export const fetchPictures = createAsyncThunk('pictures/fetchPictures', async () => {
  const data = axios.get(`${config.serverUrl}/api/pictures`).then(
    res => res.data)
  return data;
});