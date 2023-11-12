import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineHome, AiFillFire} from 'react-icons/ai'
import {GiHeartBeats} from 'react-icons/gi'
import {BiListPlus, BiSearchAlt2} from 'react-icons/bi'
import Header from '../Header'
import HomeVideoItem from '../HomeVideoItem'
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
    channelList: [],
    apiStatus: apiConstants.initial,
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
  })

  getChannelData = eachChannel => ({
    name: eachChannel.name,
    profileImageUrl: eachChannel.profile_image_url,
  })

  getHomeVideos = async () => {
    this.setState({apiStatus: apiConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const updatedData = data.videos.map(eachData => ({
      id: eachData.id,
      title: eachData.title,
      publishedAt: eachData.published_at,
      thumbnailUrl: eachData.thumbnail_url,
      viewCount: eachData.view_count,
    }))
    console.log(updatedData)
    const channelData = data.videos.map(eachData =>
      this.getChannelData(eachData.channel),
    )
    this.setState({
      homeVideosList: updatedData,
      channelList: channelData,
      apiStatus: apiConstants.success,
    })
  }

  clickedOnTheme = () => {
    this.setState(prevState => ({
      clickedOnThemeChanger: !prevState.clickedOnThemeChanger,
    }))
  }

  renderHomeVideos = () => (
    <div className="side-buttons-container">
      <button
        type="button"
        className="side-buttons"
        onClick={this.clickOnHomeVideos}
      >
        <AiOutlineHome className="side-button" />
        <span className="side-button-name">Home</span>
      </button>
      <button type="button" className="side-buttons">
        <AiFillFire className="side-button" />
        <span className="side-button-name">Trending</span>
      </button>
      <button type="button" className="side-buttons">
        <GiHeartBeats className="side-button" />
        <span className="side-button-name">Gaming</span>
      </button>
      <button type="button" className="side-buttons">
        <BiListPlus className="side-button" />
        <span className="side-button-name">Saved Videos</span>
      </button>
    </div>
  )

  renderHomeVideosSuccessView = () => {
    const {homeVideosList, channelList} = this.state

    return (
      <div>
        <ul>
          {homeVideosList.map(homeVideo => (
            <HomeVideoItem
              homeVideoDetails={homeVideo}
              key={homeVideo.id}
              channelList={channelList}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderHomeVideosView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderHomeVideosSuccessView()
      default:
        return null
    }
  }

  render() {
    const {clickedOnThemeChanger, apiStatus} = this.state
    const appTheme = clickedOnThemeChanger ? 'dark' : ''
    console.log(apiStatus)
    return (
      <div className={`${appTheme}`}>
        <Header clickedOnTheme={this.clickedOnTheme} appTheme={appTheme} />
        <div className="home-container">
          <div className="videos-type-container">{this.renderHomeVideos()}</div>
          <div className="search-home-videos-container">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
              />
              <BiSearchAlt2 />
            </div>
            <div>{this.renderHomeVideosView()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
