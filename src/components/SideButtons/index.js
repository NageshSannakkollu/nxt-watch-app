import {Link} from 'react-router-dom'
import {AiOutlineHome, AiFillFire} from 'react-icons/ai'
import {GiHeartBeats} from 'react-icons/gi'
import {BiListPlus} from 'react-icons/bi'
import './index.css'
import SavedVideosContext from '../../context/SavedVideosContext'

const SideButtons = () => (
  <SavedVideosContext.Consumer>
    {value => {
      const {
        backgroundTheme,
        homeButtonActive,
        trendingButtonActive,
        savedVideosButtonActive,
        gamingButtonActive,
        changeActiveHomeButtonStatus,
        changeActiveGamingButtonStatus,
        changeActiveSavedVideosButtonStatus,
        changeActiveTrendingButtonStatus,
      } = value
      const sideBannerBackgroundColor =
        backgroundTheme === 'dark' ? 'background-dark' : ''

      const homeActiveButtonBgColor = homeButtonActive ? 'bg-dark' : ''
      const trendingActiveButtonBgColor = trendingButtonActive ? 'bg-dark' : ''
      const gamingActiveButtonColor = gamingButtonActive ? 'bg-dark' : ''
      const savedVideosActiveButtonBgColor = savedVideosButtonActive
        ? 'bg-dark'
        : ''
      const homeBannerIconColor = homeButtonActive ? 'banner-red-icon' : ''
      const trendingBannerIconColor = trendingButtonActive
        ? 'banner-red-icon'
        : ''
      const gameBannerIconColor = gamingButtonActive ? 'banner-red-icon' : ''
      const savedVideosBannerIconColor = savedVideosButtonActive
        ? 'banner-red-icon'
        : ''
      const sideButtonColor =
        homeButtonActive ||
        trendingButtonActive ||
        gamingButtonActive ||
        savedVideosButtonActive
          ? 'button-weight-color'
          : 'normal-weight-color'

      const changeToTrending = () => {
        changeActiveTrendingButtonStatus()
      }

      const changeToHome = () => {
        changeActiveHomeButtonStatus()
      }

      const changeToGaming = () => {
        changeActiveGamingButtonStatus()
      }

      const changeToSavedVideos = () => {
        changeActiveSavedVideosButtonStatus()
      }
      console.log(trendingButtonActive)

      return (
        <div
          className={`side-banner-container ${sideBannerBackgroundColor}`}
          data-testid="banner"
        >
          <div
            className={`side-buttons-container  ${sideBannerBackgroundColor}`}
          >
            <Link to="/" className={`link-icons ${homeActiveButtonBgColor}`}>
              <button
                type="button"
                className="side-buttons"
                onClick={changeToHome}
              >
                <AiOutlineHome
                  className={`side-button-icon ${homeBannerIconColor}`}
                />
                <span className={`side-button-name ${sideButtonColor}`}>
                  Home
                </span>
              </button>
            </Link>
            <Link
              to="/trending"
              className={`link-icons ${trendingActiveButtonBgColor}`}
            >
              <button
                type="button"
                className="side-buttons"
                onClick={changeToTrending}
              >
                <AiFillFire
                  className={`side-button-icon ${trendingBannerIconColor}`}
                />
                <span className={`side-button-name ${sideButtonColor}`}>
                  Trending
                </span>
              </button>
            </Link>
            <Link
              to="/gaming"
              className={`link-icons ${gamingActiveButtonColor}`}
            >
              <button
                type="button"
                className="side-buttons"
                onClick={changeToGaming}
              >
                <GiHeartBeats
                  className={`side-button-icon ${gameBannerIconColor}`}
                />
                <span className={`side-button-name ${sideButtonColor}`}>
                  Gaming
                </span>
              </button>
            </Link>
            <Link
              to="/saved-videos"
              className={`link-icons ${savedVideosActiveButtonBgColor}`}
            >
              <button
                type="button"
                className="side-buttons"
                onClick={changeToSavedVideos}
              >
                <BiListPlus
                  className={`side-button-icon ${savedVideosBannerIconColor}`}
                />
                <span className={`side-button-name ${sideButtonColor}`}>
                  Saved Videos
                </span>
              </button>
            </Link>
          </div>
          <div className="contact-us-section">
            <p>CONTACT US</p>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="icon"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="icon"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="icon"
              />
            </div>

            <p className="contact-us-description">
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </SavedVideosContext.Consumer>
)

export default SideButtons
