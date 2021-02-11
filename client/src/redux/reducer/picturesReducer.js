import { createReducer } from "@reduxjs/toolkit";
import { fetchPictures,fetchOnePicture } from '../action/picturesAction'

const initialState = {
  loading: false,
  data: [],
  picture: {},
  pages: 0,
  error: null
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
  }
});

export default picturesReducer