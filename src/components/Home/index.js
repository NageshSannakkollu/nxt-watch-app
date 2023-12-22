import {Component} from 'react'
import Cookies from 'js-cookie'

import {IoIosClose} from 'react-icons/io'
import {BiSearchAlt2} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import HomeVideoItem from '../HomeVideoItem'
import SideButtons from '../SideButtons'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    clickedOnThemeChanger: false,
    homeVideosList: [],
    apiStatus: apiConstants.initial,
    searchInput: '',
    showBannerSection: true,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getUpdatedData = eachData => ({
    id: eachData.id,
    title: eachData.title,
    publishedAt: eachData.published_at,
    thumbnailUrl: eachData.thumbnail_url,
    viewCount: eachData.view_count,
    name: eachData.channel.name,
    profileImageUrl: eachData.channel.profile_image_url,
  })

  getHomeVideos = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {searchInput} = this.state
    const searchAlphaInput = searchInput.toLowerCase()
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchAlphaInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(eachData => ({
        id: eachData.id,
        title: eachData.title,
        publishedAt: eachData.published_at,
        thumbnailUrl: eachData.thumbnail_url,
        viewCount: eachData.view_count,
        name: eachData.channel.name,
        profileImageUrl: eachData.channel.profile_image_url,
      }))

      this.setState({
        homeVideosList: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  clickedOnTheme = () => {
    this.setState(prevState => ({
      clickedOnThemeChanger: !prevState.clickedOnThemeChanger,
    }))
  }

  clickOnHomeVideos = () => {
    this.getHomeVideos()
  }

  renderEmptyVideosListView = () => (
    <div className="empty-videos-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="no-videos-image"
      />
      <h3>No Search results found</h3>
      <p>Try different key words or remove search filter</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.clickOnRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderHomeVideosSuccessView = () => {
    const {homeVideosList} = this.state
    const shouldShowVideosList = homeVideosList.length > 0
    return shouldShowVideosList ? (
      <ul className="video-items-container">
        {homeVideosList.map(eachVideo => (
          <HomeVideoItem homeVideosDetails={eachVideo} key={eachVideo.id} />
        ))}
      </ul>
    ) : (
      this.renderEmptyVideosListView()
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  clickOnRetry = () => {
    this.getHomeVideos()
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
        onClick={this.clickOnRetry}
      >
        Retry
      </button>
    </div>
  )

  renderHomeVideosView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderHomeVideosSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  enterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getHomeVideos()
    }
  }

  closeBanner = () => {
    this.setState({showBannerSection: false})
  }

  render() {
    const {clickedOnThemeChanger, showBannerSection} = this.state
    const appTheme = clickedOnThemeChanger ? 'dark' : 'white'
    const appThemeVideos = clickedOnThemeChanger ? 'videos-background-dark' : ''

    const searchContainerDarkTheme = clickedOnThemeChanger
      ? 'search-dark-container'
      : ''
    const searchClassName = clickedOnThemeChanger
      ? 'dark-search-class-name'
      : ''
    return (
      <div className={`${appTheme}`}>
        <div className="header-container">
          <Header clickedOnTheme={this.clickedOnTheme} appTheme={appTheme} />
        </div>
        <div className="banner-home-container">
          <SideButtons appTheme={appTheme} />
          <div className="home-container">
            {showBannerSection && (
              <div className="banner-container" data-testid="banner">
                <div className="banner-image-description-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    className="banner-image"
                    alt="banner logo"
                  />
                  <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                  <button type="button" className="get-it-now-button">
                    GET IT NOW
                  </button>
                </div>
                <div>
                  <IoIosClose
                    className="banner-close-button"
                    onClick={this.closeBanner}
                  />
                </div>
              </div>
            )}
            <div className={`search-home-videos-container ${appThemeVideos}`}>
              <div className={`search-container ${searchContainerDarkTheme}`}>
                <input
                  type="search"
                  placeholder="Search"
                  className={`search-input ${searchClassName}`}
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.enterSearchInput}
                />
                <hr className="horizontal-line" />
                <BiSearchAlt2 className="search-icon" />
              </div>
              <div data-testid="home">{this.renderHomeVideosView()}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
