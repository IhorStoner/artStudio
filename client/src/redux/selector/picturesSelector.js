import { createSelector } from '@reduxjs/toolkit'

export const getPictures = createSelector(
  state => state.pictures.data,
  pictures => pictures
);

export const getOnePicture = createSelector(
  state => state.pictures.picture,
  picture => picture
);

export const getStateEdditPicture = createSelector(
  state => state.pictures.stateEdditPicture,
  stateEdditPicture => stateEdditPicture
)

export const getOrderList = createSelector(
  state => state.pictures.stateOrder,
  stateOrder => stateOrder
)
export const getStateTipe = createSelector(
  state => state.pictures.stateTipe,
  stateTipe => stateTipe
)