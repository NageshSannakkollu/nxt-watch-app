import {Link} from 'react-router-dom'
import './index.css'

const GamingItem = props => {
  const {trendingVideoDetails} = props
  const {title, id, publishedAt, viewCount, thumbnailUrl} = trendingVideoDetails
  return (
    <Link to={`/videos/${id}`} className="link-tending-videos">
      <li className="gaming-videos-list-container">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="thumbnail-image"
        />
        <div className="trending-description-container">
          <p>{title}</p>
          <div className="views-published-container">
            <p>{viewCount}views</p>
            <p>.{publishedAt}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default GamingItem
