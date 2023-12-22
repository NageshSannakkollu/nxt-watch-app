import {Component} from 'react'
import Cookies from 'js-cookie'
import {GiHeartBeats} from 'react-icons/gi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SideButtons from '../SideButtons'
import GamingItem from '../GamingItem'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Trending extends Component {
  state = {
    apiStatus: apiConstants.initial,
    trendingVideosList: [],
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
      const trendingVideosResponse = await response.json()

      const updatedTrendingVideos = trendingVideosResponse.videos.map(
        eachTrends => ({
          id: eachTrends.id,
          title: eachTrends.title,
          thumbnailUrl: eachTrends.thumbnail_url,
          viewCount: eachTrends.view_count,
        }),
      )

      this.setState({
        trendingVideosList: updatedTrendingVideos,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccessfulTrendingVideosView = () => {
    const {trendingVideosList} = this.state
    return (
      <div className="trending-list-container">
        <div className="trending-heading-container">
          <h1>
            <GiHeartBeats className="trending" />
            Gaming
          </h1>
        </div>
        <ul className="gaming-list-container">
          {trendingVideosList.map(eachTrendingVideo => (
            <GamingItem
              trendingVideoDetails={eachTrendingVideo}
              key={eachTrendingVideo.id}
            />
          ))}
        </ul>
      </div>
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
        alt="failure"
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

  renderTrendingVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessfulTrendingVideosView()
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
        <SideButtons />
        <div className="trending-container" data-testid="gaming">
          {this.renderTrendingVideos()}
        </div>
      </div>
    )
  }
}

export default Trending
