import React from 'react'
import { reduxForm, Field } from 'redux-form'
import TextField from './TextField'
import './AdminAuthPopup.scss'

function AdminAuthPopup({ handleSubmit, authError }) {


  return (
    <div className="fixed-overlay">
      <div className='modal'>
        <div className="modal-container">
          <form className="auth-popup" onSubmit={handleSubmit}>
            <>
              <div className="auth-popup__inputs">
                <div className="auth-popup__input-container">
                  <p>Login:</p>
                  <Field className='auth-popup__input auth-popup__input--login' name='login' component={TextField} placeholder=''></Field>
                </div>
                <div className="auth-popup__input-container">
                  <p>Password:</p>
                  <Field className='auth-popup__input auth-popup__input--password' type="password" name='password' component={TextField} placeholder=''></Field>
                </div>
              </div>
              {authError && <div className='auth-popup__warning'>Не правильное имя или пароль</div>}
              <div className="auth-popup__submit-container">
                <button type='submit' className='auth-popup__btn-submit'>Войти</button>
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
