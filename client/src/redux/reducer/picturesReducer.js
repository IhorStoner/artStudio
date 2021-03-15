import { createReducer } from "@reduxjs/toolkit";
import { fetchPictures, fetchOnePicture, setStateEdditPicture, setOrderedGoods, setStateType, refreshOrderedGoods, fetchTypesOfClothing, setTypesOfClothing } from '../action/picturesAction'

const initialState = {
  loading: false,
  data: [],
  picture: {},
  pages: 0,
  error: null,
  stateEdditPicture: {},
  stateOrder: [],
  stateType: 'trousers',
  typeOfClothing: []

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
  [fetchTypesOfClothing.fulfilled]: (state, action) => {
    state.loading = false
    state.typeOfClothing = action.payload;
  },

  [setTypesOfClothing.type]: (state, action) => {
    state.typeOfClothing = action.payload
  },
  [setStateEdditPicture.type]: (state, action) => {
    state.stateEdditPicture = action.payload;
  },
  [setOrderedGoods.type]: (state, action) => {
    state.stateOrder.push(action.payload)
  },
  [setStateType.type]: (state, action) => {
    state.stateType = action.payload
  },
  [refreshOrderedGoods.type]: (state, action) => {
    state.stateOrder = action.payload
  }
});

export default picturesReducer