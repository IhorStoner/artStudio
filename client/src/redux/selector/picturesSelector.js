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

export const getStateType = createSelector(
  state => state.pictures.stateType,
  stateType => stateType
)

export const getTypesOfClothing = createSelector(
  state => state.pictures.typeOfClothing,
  typeOfClothing => typeOfClothing
)

export const getPicturePreview = createSelector(
  state => state.pictures.picturePreview,
  picturePreview => picturePreview
)

export const getStateOrder = createSelector(
  state => state.storage,
  stateOrder => stateOrder
)