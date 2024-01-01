import {Link} from 'react-router-dom'
import {AiOutlineHome, AiFillFire} from 'react-icons/ai'
import {GiHeartBeats} from 'react-icons/gi'
import {BiListPlus} from 'react-icons/bi'
import './index.css'
import SavedVideosContext from '../../context/SavedVideosContext'

const SideButtons = () => (
  <SavedVideosContext.Consumer>
    {value => {
      const {backgroundTheme} = value
      const sideBannerBackgroundColor =
        backgroundTheme === 'dark' ? 'background-dark' : ''

      const iconsBackgroundColor =
        backgroundTheme === 'dark' ? 'icons-dark' : ''
      const homeActive = () => {
        console.log('Active Home')
      }
      return (
        <div className={`side-banner-container ${sideBannerBackgroundColor}`}>
          <div className="side-buttons-container">
            <Link to="/" className={`link-icons ${iconsBackgroundColor}`}>
              <button
                type="button"
                className="side-buttons"
                data-testid="banner"
                onClick={homeActive}
              >
                <AiOutlineHome className="side-button-icon" />
                <span className="side-button-name">Home</span>
              </button>
            </Link>
            <Link
              to="/trending"
              className={`link-icons ${iconsBackgroundColor}`}
            >
              <button
                type="button"
                className="side-buttons"
                data-testid="banner"
              >
                <AiFillFire className="side-button-icon" />
                <span className="side-button-name">Trending</span>
              </button>
            </Link>
            <Link to="/gaming" className={`link-icons ${iconsBackgroundColor}`}>
              <button
                type="button"
                className="side-buttons"
                data-testid="banner"
              >
                <GiHeartBeats className="side-button-icon" />
                <span className="side-button-name">Gaming</span>
              </button>
            </Link>
            <Link
              to="/saved-videos"
              className={`link-icons ${iconsBackgroundColor}`}
            >
              <button
                type="button"
                className="side-buttons"
                data-testid="banner"
              >
                <BiListPlus className="side-button-icon" />
                <span className="side-button-name">Saved Videos</span>
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
