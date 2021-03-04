import { createSelector } from '@reduxjs/toolkit'

export const getPictures = createSelector(
  state => state.pictures.data,
  pictures => pictures
);

export const getOnePicture = createSelector(
  state => state.pictures.picture,
  picture => picture
);