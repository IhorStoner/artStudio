import { combineReducers } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'
import ordersReducer from './reducer/ordersReducer'
import picturesReducer from './reducer/picturesReducer'
import storageReducer from './reducer/storageReducer'
import localReducer from './reducer/localReducer';

export default combineReducers({
  pictures: picturesReducer,
  order: ordersReducer,
  storage: storageReducer,
  form: formReducer,
	local: localReducer,
})