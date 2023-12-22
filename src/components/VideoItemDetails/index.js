import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import SavedVideosContext from '../../context/SavedVideosContext'
import Header from '../Header'
import SideButtons from '../SideButtons'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiConstants.initial,
    videoDetailsList: {},
    clickOnSave: false,
    clickOnLike: false,
    clickOnUnLike: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getUpdatedData = eachVideo => ({
    id: eachVideo.video_details.id,
    description: eachVideo.video_details.description,
    publishedAt: eachVideo.video_details.published_at,
    thumbnailUrl: eachVideo.video_details.thumbnail_url,
    videoUrl: eachVideo.video_details.video_url,
    title: eachVideo.video_details.title,
    viewCount: eachVideo.video_details.view_count,
    name: eachVideo.video_details.channel.name,
    profileImageUrl: eachVideo.video_details.channel.profile_image_url,
    subscriberCount: eachVideo.video_details.channel.subscriber_count,
  })

  getVideoDetails = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const responseData = await response.json()
      const updatedData = this.getUpdatedData(responseData)

      this.setState({
        videoDetailsList: updatedData,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  unlikeButtonClicked = () => {
    this.setState(prevState => ({
      clickOnUnLike: !prevState.clickOnUnLike,
    }))
    this.setState({clickOnLike: false})
  }

  likeButtonClicked = () => {
    this.setState(prevState => ({clickOnLike: !prevState.clickOnLike}))
    this.setState({clickOnUnLike: false})
  }

  renderVideoDetailsSuccessView = () => (
    <SavedVideosContext.Consumer>
      {value => {
        const {addToSavedVideos, deleteSavedVideo} = value
        const {
          videoDetailsList,
          clickOnSave,
          clickOnLike,
          clickOnUnLike,
        } = this.state
        const saveButtonClicked = () => {
          this.setState(prevState => ({clickOnSave: !prevState.clickOnSave}))
          if (clickOnSave === false) {
            addToSavedVideos({...videoDetailsList})
          } else {
            console.log(clickOnSave)
          }
        }

        const saveButtonStatus = clickOnSave ? 'Saved' : 'Save'
        const buttonsClassName = clickOnSave ? 'blue' : ''
        const likeButtonClassName = clickOnLike ? 'blue' : ''
        const unLikeButtonClassName = clickOnUnLike ? 'blue' : ''
        const {
          name,
          title,
          videoUrl,
          viewCount,
          publishedAt,
          profileImageUrl,
          subscriberCount,
          description,
          id,
        } = videoDetailsList

        return (
          <div className="video-item-details-container" key={id}>
            <ReactPlayer url={videoUrl} />
            <h1 className="video-item-player-title">{title}</h1>
            <div className="react-video-player-buttons">
              <div className="views-time-container">
                <p>{viewCount} views</p>
                <p>{publishedAt}</p>
              </div>
              <div>
                <button
                  type="button"
                  className={`buttons ${likeButtonClassName}`}
                  onClick={this.likeButtonClicked}
                >
                  <p>
                    <AiOutlineLike />
                    like
                  </p>
                </button>
                <button
                  type="button"
                  onClick={this.unlikeButtonClicked}
                  className={`buttons ${unLikeButtonClassName}`}
                >
                  <p>
                    <AiOutlineDislike />
                    Unlike
                  </p>
                </button>
                <button
                  type="button"
                  className={`buttons ${buttonsClassName}`}
                  onClick={saveButtonClicked}
                >
                  <p>
                    <BiListPlus />
                    {saveButtonStatus}
                  </p>
                </button>
              </div>
            </div>
            <hr />
            <div className="image-subscription-container">
              <img
                src={profileImageUrl}
                alt="profile"
                className="ib-cricket-image"
              />
              <div className="name-subscription-container">
                <h4>{name}</h4>
                <p>{subscriberCount} subscribers</p>
                <p>{description}</p>
              </div>
            </div>
          </div>
        )
      }}
    </SavedVideosContext.Consumer>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

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
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  renderVideoDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderVideoDetailsSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <SideButtons />
        <div data-testid="videoItemDetails">{this.renderVideoDetails()}</div>
      </div>
    )
  }
}

export default VideoItemDetails
