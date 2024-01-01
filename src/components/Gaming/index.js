import {Component} from 'react'
import Cookies from 'js-cookie'
import {GiHeartBeats} from 'react-icons/gi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideButtons from '../SideButtons'
import GamingItem from '../GamingItem'

import './index.css'
import SavedVideosContext from '../../context/SavedVideosContext'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    apiStatus: apiConstants.initial,
    gamingVideosList: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const trendingVideosUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(trendingVideosUrl, options)
    if (response.ok) {
      const gamingVideosResponse = await response.json()

      const updatedTrendingVideos = gamingVideosResponse.videos.map(
        eachTrends => ({
          id: eachTrends.id,
          title: eachTrends.title,
          thumbnailUrl: eachTrends.thumbnail_url,
          viewCount: eachTrends.view_count,
        }),
      )

      this.setState({
        gamingVideosList: updatedTrendingVideos,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderGamingSuccessView = () => {
    const {gamingVideosList} = this.state
    return (
      <SavedVideosContext.Consumer>
        {value => {
          const {backgroundTheme} = value
          const gamingHeadingBgContainer =
            backgroundTheme === 'dark' ? 'gaming-heading-background' : ''
          const gamingIconColor =
            backgroundTheme === 'dark' ? 'gaming-red-icon' : ''
          return (
            <div className="gaming-main-container">
              <div
                className={`gaming-heading-container ${gamingHeadingBgContainer}`}
              >
                <GiHeartBeats className={`gaming-icon ${gamingIconColor}`} />
                <h1>Gaming</h1>
              </div>
              <ul className="gaming-items-container">
                {gamingVideosList.map(eachTrendingVideo => (
                  <GamingItem
                    gamingVideoDetails={eachTrendingVideo}
                    key={eachTrendingVideo.id}
                  />
                ))}
              </ul>
            </div>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  clickOnRetryButton = () => {
    this.getTrendingVideos()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h3>Oops! Something Went Wrong</h3>
      <p>We are having some trouble to complete your request.</p>
      <p>Please try again.</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.clickOnRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderGamingVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderGamingSuccessView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="gaming-container">
          <SideButtons />
          <SavedVideosContext.Consumer>
            {value => {
              const {backgroundTheme} = value
              const gamingBackgroundColor =
                backgroundTheme === 'dark' ? 'game-dark-background' : ''

              return (
                <div
                  className={`gaming-views-container ${gamingBackgroundColor}`}
                  data-testid="gaming"
                >
                  {this.renderGamingVideos()}
                </div>
              )
            }}
          </SavedVideosContext.Consumer>
          )
        </div>
      </div>
    )
  }
}

export default Trending
