import React, { useCallback, useState, useContext } from 'react'
import AdminAuthPopup from '../../components/AdminAuthPopup/AdminAuthPopup'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { useHistory } from 'react-router-dom'
import config from '../../config/default.json'

export default function AdminAuthPage() {
  const [signInSuccess, setSignInSuccess] = useState();
  const [error, setError] = useState('');
  const auth = useContext(AuthContext);
  const history = useHistory();

  const onSubmitAuth = useCallback(async values => {
    const result = await axios.post(`${config.serverUrl}/api/admin`, values)
      .then(res => {
        auth.login(res.data.token, res.data.id)
        setSignInSuccess(true)
        setError('')
        history.push('/home')
      })
      .catch(err => {
        setError(err.response.data.error)
        setSignInSuccess(false)
      })
  }, [])

  return (
    <div>
      <AdminAuthPopup onSubmit={onSubmitAuth} />
    </div>
  )
}
