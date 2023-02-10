import React from "react"
import { Navigate, NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import Cookies from 'js-cookie'

import './index.css'

const LoginForm = () =>{

  const navigate = useNavigate();

    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [showUsernameError, setShowUsernameError] = useState(false)
    const [showPasswordError, setShowPasswordError] = useState(false)
    const [showSubmitError, setShowSubmitError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const validateUsername = () => usernameInput !== ''

    const validatePassword = () =>
      passwordInput.length > 8 && passwordInput !== ''

    const onBlurPassword = () => {
      const isValidPassword = validatePassword()

      setShowPasswordError(!isValidPassword)
    }

    const onChangePassword = event => {
      setPasswordInput(event.target.value)
    }

    const renderPasswordField = () => {
      const className = showPasswordError
        ? 'name-input-field error-field'
        : 'name-input-field'

      return (
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className={className}
            value={passwordInput}
            placeholder="password"
            onChange={onChangePassword}
            onBlur={onBlurPassword}
          />
        </div>
      )
    }

    const onBlurUsername = () => {
      const isValidUsername = validateUsername()
      setShowUsernameError(!isValidUsername)
    }

    const onChangeUsername = event => {
      setUsernameInput(event.target.value)
    }

    const renderUserNameField = () => {
      const className = showUsernameError
        ? 'name-input-field error-field'
        : 'name-input-field'

      return (
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className={className}
            value={usernameInput}
            placeholder="username"
            onChange={onChangeUsername}
            onBlur={onBlurUsername}
          />
        </div>
      )
    }
    

    const onSubmitSuccess = (data) => {
      Cookies.set('login_token', data.jwtToken, {
        expires: 30,
      })
      //console.log(data.role)
      if(data.databaseUserRole.role === "Master") {
        navigate("/master")
      }else{
        navigate("/student")
      }
      
    }

    const onSubmitFailure = err => {
      setShowSubmitError(true)
      setErrorMsg(err)
    }

    const onSubmitForm = async event => {
      event.preventDefault()
      const isValidUsername = validateUsername()
      const isValidPassword = validatePassword()

      if (isValidUsername && isValidPassword) {
        // fetching to Backend
        const userDetails = {
          username: usernameInput,
          password: passwordInput,
        }

        //console.log(JSON.stringify(userDetails))

        const url = 'http://localhost:3011/login/'
        const options = {
          method: 'POST',
          body: JSON.stringify(userDetails),
          headers: {
            'content-type': 'application/json',
          },
        }
        const response = await fetch(url, options)
        //console.log(response)
        const data = await response.json()
        //  console.log(data)
        if (response.ok === true) {
          onSubmitSuccess(data)
        } else {
          onSubmitFailure(data.error_msg)
        }
      } else {
        setShowUsernameError(!isValidUsername)
        setShowPasswordError(!isValidPassword)
      }
    }
    
      const renderLoginForm = () => (
      <form className="form-container" onSubmit={onSubmitForm}>
        {renderUserNameField()}
        {showUsernameError && <p className="error-message">Required</p>}
        {renderPasswordField()}
        {showPasswordError && <p className="error-message">Required</p>}
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
    )

    const token = Cookies.get('login_token')
    if (token !== undefined) {
      return <Navigate to="/student" />
    }
    
    return (
    <div className="registration-form-container">
    <h1 className="form-app-title">Wellcome to the App</h1>
    <h1 className="form-title">Login</h1>
    <div className="view-container">
       {renderLoginForm()}
      {showSubmitError && (
        <p className="name-input-field error-field">*{errorMsg}</p>
      )} 
      <p className="link-to-register">
        Donot have an account ? <NavLink to="/register">Register</NavLink>
      </p>
    </div>
  </div>
)
    }


export default LoginForm

