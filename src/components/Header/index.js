import {FaMoon} from 'react-icons/fa'
import {WiDaySunny} from 'react-icons/wi'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import './index.css'
import SavedVideosContext from '../../context/SavedVideosContext'

const Header = props => {
  const clickOnLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <SavedVideosContext.Consumer>
      {value => {
        const {backgroundTheme, changeTheme} = value
        const oneClickToChangeTheme = () => {
          changeTheme()
        }

        const darkThemeLogo =
          backgroundTheme === 'dark'
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        const themeChanger =
          backgroundTheme === 'dark' ? (
            <WiDaySunny className="theme-icon" />
          ) : (
            <FaMoon className="sun-theme-icon" />
          )
        const navContainerBackground =
          backgroundTheme === 'dark' ? 'dark-nav' : ''

        const logoutDarkTheme = backgroundTheme === 'dark' ? 'dark-logout' : ''

        return (
          <nav className={`nav-container ${navContainerBackground}`}>
            <Link to="/">
              <img
                src={darkThemeLogo}
                alt="website logo"
                className="logo-image"
              />
            </Link>
            <ul className="theme-profile-logout-container">
              <li>
                <button
                  type="button"
                  className="theme"
                  onClick={oneClickToChangeTheme}
                  data-testid="theme"
                >
                  {themeChanger}
                </button>
              </li>
              <li>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile-image"
                />
              </li>
              <li>
                <Popup
                  modal
                  trigger={
                    <button
                      type="button"
                      className="logout-button"
                      onClick={clickOnLogout}
                    >
                      Logout
                    </button>
                  }
                  position="bottom right"
                >
                  {cancel => (
                    <div
                      className={`logout-popup-container ${logoutDarkTheme}`}
                    >
                      <div className="popup-inside-container">
                        <p>Are you sure, you want to logout</p>
                        <div className="buttons-container">
                          <button
                            type="button"
                            className="button cancel-button"
                            onClick={() => cancel()}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="button confirm-button"
                            onClick={() => {
                              Cookies.remove('jwt_token')
                              const {history} = props
                              history.replace('/login')
                            }}
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Popup>
              </li>
            </ul>
          </nav>
        )
      }}
    </SavedVideosContext.Consumer>
  )
}
export default withRouter(Header)
