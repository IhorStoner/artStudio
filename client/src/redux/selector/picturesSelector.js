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

export const getStateOrder = createSelector(
  state => state.pictures.stateOrder,
  stateOrder => stateOrder
)
export const getStateType = createSelector(
  state => state.pictures.stateType,
  stateType => stateType
)
export const getTypesOfClothing = createSelector(
  state => state.pictures.typeOfClothing,
  typeOfClothing => typeOfClothing
)