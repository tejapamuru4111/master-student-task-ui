import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from "react"
import {v4 as uuidv4} from 'uuid'

import './index.css'

const RegistrationForm = () => {

    const navigate = useNavigate()

  const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [firstNameInput, setFirstNameInput] = useState('')
    const [lastNameInput, setLastNameInput] = useState('')
    const [roleInput, setRoleInput] = useState('')
    const [showUsernameError, setShowUsernameError] = useState(false)
    const [showPasswordError, setShowPasswordError] = useState(false)
    const [showRoleError, setShowRoleError] = useState(false)
    const [showFirstNameError, setShowFirstNameError] = useState(false)
    const [showLastNameError, setShowLastNameError] = useState(false)
    const [showSubmitError, setShowSubmitError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')


    const validateLastName = () =>  (lastNameInput !== '')

  const validateFirstName = () => (firstNameInput !== '')

  const validateUsername = () => (usernameInput !== '') 

  const validatePassword = () => (passwordInput.length > 8 && passwordInput !== '')

  const validateRole = () => (roleInput !== '')

  const onChangeRole = event => {
      setRoleInput(event.target.value)
  }

  const renderRoleField = () => {
    const className = showRoleError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="gender">
          ROLE
        </label>
        <div className="gender-field-card">
          <input
            type="radio"
            id="master"
            name="role"
            value="Master"
            className={className}
            onChange={onChangeRole}
          />
          <label htmlFor="master" className="input-label">
            Master
          </label>
        </div>
        <div className="gender-field-card">
          <input
            type="radio"
            id="student"
            name="role"
            value="Student"
            className={className}
            onChange={onChangeRole}
          />
          <label htmlFor="student" className="input-label">
            Student
          </label>
        </div>
      </div>
    )
  }

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

  const onBlurLastName = () => {
    const isValidLastName = validateLastName()

    setShowLastNameError(!isValidLastName)
  }

  const onChangeLastName = event => {

    setLastNameInput(event.target.value)
  }

  const renderLastNameField = () => {
    const className = showLastNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="lastName">
          LAST NAME
        </label>
        <input
          type="text"
          id="lastName"
          className={className}
          value={lastNameInput}
          placeholder="Last name"
          onChange={onChangeLastName}
          onBlur={onBlurLastName}
        />
      </div>
    )
  }

  const onBlurFirstName = () => {
    const isValidFirstName = validateFirstName()

    setShowFirstNameError(!isValidFirstName)
  }

  const onChangeFirstName = event => {

    setFirstNameInput(event.target.value)
  }

  const renderFirstNameField = () => {
    const className = showFirstNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="firstName">
          FIRST NAME
        </label>
        <input
          type="text"
          id="firstName"
          className={className}
          value={firstNameInput}
          placeholder="First name"
          onChange={onChangeFirstName}
          onBlur={onBlurFirstName}
        />
      </div>
    )
  }

  

  const onSubmitSuccess = () => {
    navigate("/login")
  }

  const onSubmitFailure = err => {
    setShowSubmitError(true)
    setErrorMsg(err)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const isValidFirstName = validateFirstName()
    const isValidLastName = validateLastName()
    const isValidUsername = validateUsername()
    const isValidPassword = validatePassword()
    const isValidRole = validateRole()

    if (
      isValidFirstName &&
      isValidLastName &&
      isValidUsername &&
      isValidPassword &&
      isValidRole
    ) {
      // fetching to Backend
      const userDetails = {
        id : uuidv4(),
        username: usernameInput,
        password: passwordInput,
        firstname: firstNameInput,
        lastname: lastNameInput,
        role: roleInput,
      }


      const url = 'http://localhost:3011/register'
      const options = {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers : {
                "Content-type" : "application/json",
            }
      }
      console.log(userDetails)
      const response = await fetch(url ,options)
      // const data = await response.json()
      console.log(response)
      if (response.ok === true) {
        onSubmitSuccess()
      } else {
        onSubmitFailure('db error')
      }
    } else {
      setShowFirstNameError(!isValidFirstName)
        setShowLastNameError(!isValidLastName)
        setShowUsernameError(!isValidUsername)
        setShowPasswordError(!isValidPassword)
        setShowRoleError(!isValidRole)
    }
  }

  const renderRegistrationForm = () =>  (
      <form className="form-container" onSubmit={onSubmitForm}>
        {renderFirstNameField()}
        {showFirstNameError && <p className="error-message">Required</p>}
        {renderLastNameField()}
        {showLastNameError && <p className="error-message">Required</p>}
        {renderUserNameField()}
        {showUsernameError && <p className="error-message">Required</p>}
        {renderPasswordField()}
        {showPasswordError && <p className="error-message">Required</p>}
        {renderRoleField()}
        {showRoleError && <p className="error-message">Required</p>}
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    )
  

    return (
      <div className="registration-form-container">
        <h1 className="form-app-title">Wellcome to the App</h1>
        <h1 className="form-title">Registration</h1>
        <div className="view-container">
          {renderRegistrationForm()}
          {showSubmitError && (
            <p className="name-input-field error-field">*{errorMsg}</p>
          )}
          <p className="link-to-register">
            Already have an account ? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </div>
    )
  }


export default RegistrationForm
