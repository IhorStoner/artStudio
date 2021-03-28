import { createSelector } from '@reduxjs/toolkit'

export const localSelector = createSelector(
	state => state.local,
	mobileMenu => mobileMenu,
);