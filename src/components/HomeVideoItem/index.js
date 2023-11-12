import './index.css'

const HomeVideoItem = props => {
  const {channelList} = props

  return channelList.map(eachChannel => {
    const {homeVideoDetails} = props
    const {id, publishedAt, viewCount, thumbnailUrl, title} = homeVideoDetails
    return (
      <li>
        <img src={thumbnailUrl} alt={title} className="thumbnail-image" />
        <img
          src={eachChannel.profileImageUrl}
          alt={eachChannel.name}
          className="profile-image"
        />
      </li>
    )
  })
}

export default HomeVideoItem
