import React, { useState } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextField from './TextField'
import { useDispatch } from 'react-redux'
import './AdminAuthPopup.scss'

function AdminAuthPopup({ handleSubmit, valid, setAuthError, submitting, authError }) {
  const dispatch = useDispatch()

  return (
    <div className="fixed-overlay">
      <div className='modal'>
        <div className="modal_container">
          <form className="authPopup" onSubmit={handleSubmit}>
            <>
              <div className="authPopup__inputs">
                <div className="authPopup__inputContainer">
                  <p>Login:</p>
                  <Field className='authPopup__input authPopup__input--login' name='login' component={TextField} placeholder=''></Field>
                </div>
                <div className="authPopup__inputContainer">
                  <p>Password:</p>
                  <Field className='authPopup__input authPopup__input--password' name='password' component={TextField} placeholder=''></Field>
                </div>
              </div>
              {authError && <div className='authPopup__warning'>Не правильное имя или пароль</div>}
              <div className="authPopup__submitContainer">
                <button type='submit' className='authPopup__btnSubmit'>Войти</button>
              </div>
            </>
          </form>
        </div>
      </div>
    </div>
  )
}


export default reduxForm({
  form: "auth",
})(AdminAuthPopup);
