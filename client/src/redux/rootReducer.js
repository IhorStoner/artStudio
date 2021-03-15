import { combineReducers } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'
import ordersReducer from './reducer/ordersReducer'
import picturesReducer from './reducer/picturesReducer'

export default combineReducers({
  pictures: picturesReducer,
  order: ordersReducer,
  form: formReducer
})