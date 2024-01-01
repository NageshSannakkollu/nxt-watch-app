import {Link} from 'react-router-dom'
import './index.css'

const GamingItem = props => {
  const {gamingVideoDetails} = props
  const {title, id, publishedAt, viewCount, thumbnailUrl} = gamingVideoDetails
  return (
    <Link to={`/videos/${id}`} className="link-tending-videos">
      <li className="gaming-videos-list">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="gaming-thumbnail-image"
        />
        <div className="trending-description-container">
          <p>{title}</p>
          <div className="views-published-container">
            <p className="gaming-views">{viewCount}Watching worldwide</p>
            <p>.{publishedAt}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default GamingItem
