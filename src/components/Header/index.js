import {FaMoon} from 'react-icons/fa'
import {WiDaySunny} from 'react-icons/wi'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {clickedOnTheme, appTheme} = props
  console.log(appTheme)

  const clickOnLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  const oneClickToChangeTheme = () => {
    clickedOnTheme()
  }

  const darkThemeLogo =
    appTheme === 'dark'
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
  const themeChanger = appTheme === 'dark' ? <WiDaySunny /> : <FaMoon />
  return (
    <nav className="nav-container">
      <Link to="/">
        <img src={darkThemeLogo} alt="logo" className="logo-image" />
      </Link>
      <div className="theme-profile-logout-container">
        <button type="button" className="theme" onClick={oneClickToChangeTheme}>
          {themeChanger}
        </button>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          alt="profile"
          className="profile-image"
        />
        <button type="button" className="logout-button" onClick={clickOnLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
