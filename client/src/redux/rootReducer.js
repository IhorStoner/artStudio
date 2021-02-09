import { combineReducers } from '@reduxjs/toolkit'
import { reducer as formReducer } from 'redux-form'
import picturesReducer from './reducer/picturesReducer'

export default combineReducers({
  pictures: picturesReducer,
  form: formReducer
})