import { createReducer } from "@reduxjs/toolkit";
import { fetchPictures, fetchOnePicture, setStateEdditPicture, setOrderedGoods, setStateTipe, refreshOrderedGoods } from '../action/picturesAction'

const initialState = {
  loading: false,
  data: [],
  picture: {},
  pages: 0,
  error: null,
  stateEdditPicture: {},
  stateOrder: [],
  stateTipe: 'trousers'
};

const picturesReducer = createReducer(initialState, {
  [fetchPictures.pending]: (state) => {
    state.loading = true;
    state.error = null
  },
  [fetchPictures.fulfilled]: (state, action) => {
    state.data = action.payload;
    state.loading = false;

  },
  [fetchPictures.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [fetchOnePicture.pending]: (state) => {
    state.loading = true;
    state.error = null
  },
  [fetchOnePicture.fulfilled]: (state, action) => {
    state.picture = action.payload[0];
    state.loading = false;
  },
  [fetchOnePicture.rejected]: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  [setStateEdditPicture.type]: (state, action) => {
    state.stateEdditPicture = action.payload;
  },
  [setOrderedGoods.type]: (state, action) => {
    state.stateOrder.push(action.payload)
  },
  [setStateTipe.type]: (state, action) => {
    state.stateTipe = action.payload
  },
  [refreshOrderedGoods.type]: (state, action) => {
    state.stateOrder = action.payload
  }
});

export default picturesReducer