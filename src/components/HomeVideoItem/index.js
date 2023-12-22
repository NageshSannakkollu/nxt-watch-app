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

  const findTiming = formatDistanceToNow(new Date())
  console.log(findTiming)

  return (
    <Link to={`/videos/${id}`} className="link-item" key={id}>
      <li className="home-videos-container">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="thumbnail-picture"
        />
        <div className="profile-image-title-info-container">
          <img src={profileImageUrl} alt={name} className="profile-image" />
          <div className="profile-information-details-container">
            <p className="title">{title}</p>
            <p className="name">{name}</p>
            <div className="views-count-published-time-container">
              <p>{viewCount} views</p>
              <p>.{publishedAt}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default HomeVideoItem
