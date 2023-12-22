import {Link} from 'react-router-dom'
import {AiOutlineHome, AiFillFire} from 'react-icons/ai'
import {GiHeartBeats} from 'react-icons/gi'
import {BiListPlus} from 'react-icons/bi'

import './index.css'

const SideButtons = props => {
  const renderListTypeHightLights = () => {
    const {appTheme} = props
    const clickOnHome = () => {
      console.log('clickOnHome')
    }
    return (
      <div className={`side-buttons-container ${appTheme}`}>
        <Link to="/">
          <button
            type="button"
            className="side-buttons"
            data-testid="banner"
            onClick={clickOnHome}
          >
            <AiOutlineHome className="side-button" />
            <span className="side-button-name">Home</span>
          </button>
        </Link>
        <Link to="/trending">
          <button type="button" className="side-buttons" data-testid="banner">
            <AiFillFire className="side-button" />
            <span className="side-button-name">Trending</span>
          </button>
        </Link>
        <Link to="/gaming">
          <button type="button" className="side-buttons" data-testid="banner">
            <GiHeartBeats className="side-button" />
            <span className="side-button-name">Gaming</span>
          </button>
        </Link>
        <Link to="/saved-videos">
          <button type="button" className="side-buttons" data-testid="banner">
            <BiListPlus className="side-button" />
            <span className="side-button-name">Saved Videos</span>
          </button>
        </Link>
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
  }

  return (
    <div className="videos-type-container">{renderListTypeHightLights()}</div>
  )
}

export default SideButtons
