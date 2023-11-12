import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    clickOnShowPassword: false,
    showErrorMessage: false,
    errorMsg: '',
  }

  renderSuccessView = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  renderFailureView = errorMessage => {
    this.setState({showErrorMessage: true, errorMsg: errorMessage})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.renderSuccessView(data.jwt_token)
    } else {
      this.renderFailureView(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div className="input-field-container">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          className="input-field"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password, clickOnShowPassword} = this.state
    console.log(clickOnShowPassword)
    const passwordClass = clickOnShowPassword ? 'text' : 'password'
    return (
      <div className="input-field-container">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type={passwordClass}
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({
      clickOnShowPassword: !prevState.clickOnShowPassword,
    }))
  }

  render() {
    const {showErrorMessage, errorMsg} = this.state
    return (
      <div className="app-container">
        <div className="login-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="logo"
            className="logo-image"
          />
          <form className="form-container" onSubmit={this.onSubmitForm}>
            {this.renderUsername()}
            {this.renderPassword()}
            <div className="show-password-container">
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox"
                onChange={this.onChangeCheckbox}
              />
              <label htmlFor="checkbox">Show Password</label>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showErrorMessage && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
