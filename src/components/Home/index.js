import {Component} from 'react'
import Cookies from 'js-cookie'

import {IoIosClose} from 'react-icons/io'
import {BiSearchAlt2} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import HomeVideoItem from '../HomeVideoItem'
import SideButtons from '../SideButtons'
import './index.css'
import SavedVideosContext from '../../context/SavedVideosContext'

const homeApiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    homeVideosList: [],
    apiStatus: homeApiConstants.initial,
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
    this.setState({apiStatus: homeApiConstants.inProgress})
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
        apiStatus: homeApiConstants.success,
      })
    } else {
      this.setState({apiStatus: homeApiConstants.failure})
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
    <SavedVideosContext.Consumer>
      {value => {
        const {backgroundTheme} = value
        const homeFailureViewImages =
          backgroundTheme === 'dark'
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

        return (
          <div className="failure-container">
            <img
              src={homeFailureViewImages}
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
      }}
    </SavedVideosContext.Consumer>
  )

  renderHomeVideosView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case homeApiConstants.success:
        return this.renderHomeVideosSuccessView()
      case homeApiConstants.failure:
        return this.renderFailureView()
      case homeApiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  closeBanner = () => {
    this.setState({showBannerSection: false})
  }

  clickOnSearchIcon = () => {
    this.getHomeVideos()
  }

  render() {
    const {showBannerSection} = this.state

    return (
      <SavedVideosContext.Consumer>
        {value => {
          const {backgroundTheme} = value
          const appThemeVideos =
            backgroundTheme === 'dark' ? 'videos-background-dark' : ''
          const searchContainerDarkTheme = backgroundTheme
            ? 'search-dark-container'
            : ''
          const searchClassName = backgroundTheme
            ? 'dark-search-class-name'
            : ''
          return (
            <div>
              <Header />
              <div className="side-banner-home-container">
                <SideButtons />
                <div className="home-container">
                  {showBannerSection && (
                    <div className="banner-container">
                      <div
                        className="banner-image-description-container"
                        data-testid="banner"
                      >
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          className="banner-image"
                          alt="net watch logo"
                        />
                        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                        <button type="button" className="get-it-now-button">
                          GET IT NOW
                        </button>
                      </div>
                      <div>
                        <button type="button" data-testid="close">
                          <IoIosClose
                            className="banner-close-button"
                            onClick={this.closeBanner}
                            alt="close"
                          />
                        </button>
                      </div>
                    </div>
                  )}
                  <div
                    className={`search-home-videos-container ${appThemeVideos}`}
                  >
                    <div
                      className={`search-container ${searchContainerDarkTheme}`}
                    >
                      <input
                        type="search"
                        placeholder="Search"
                        className={`search-input ${searchClassName}`}
                        onChange={this.onChangeSearchInput}
                      />
                      <hr className="horizontal-line" />
                      <div>
                        <button
                          type="button"
                          data-testid="searchButton"
                          onClick={this.clickOnSearchIcon}
                          onKeyDown={this.enterSearchInput}
                        >
                          <span>
                            <BiSearchAlt2
                              className="search-icon"
                              alt="search icon"
                            />
                          </span>
                        </button>
                      </div>
                    </div>
                    <div
                      data-testid="home"
                      className={`home-container-background-color ${backgroundTheme}`}
                    >
                      {this.renderHomeVideosView()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }
}

export default Home
