import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

import './index.css'

const HomeVideoItem = props => {
  const {homeVideosDetails} = props
  const {
    id,
    thumbnailUrl,
    name,
    profileImageUrl,
    title,
    viewCount,
    publishedAt,
  } = homeVideosDetails

  const findTiming = formatDistanceToNow(new Date(publishedAt))

  return (
    <Link to={`/videos/${id}`} className="link-item" key={id}>
      <li className="home-videos-container">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="thumbnail-picture"
        />
        <div className="profile-image-title-info-container">
          <img
            src={profileImageUrl}
            alt="channel logo"
            className="profile-image"
          />
          <div className="profile-information-details-container">
            <p className="title">{title}</p>
            <p className="name">{name}</p>
            <div className="views-count-published-time-container">
              <p>{viewCount} views</p>
              <p>.{findTiming}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default HomeVideoItem
