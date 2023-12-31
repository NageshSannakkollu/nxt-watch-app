import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import './index.css'

const TrendingVideoItem = props => {
  const {trendingVideoDetails} = props
  const {
    title,
    id,
    name,
    publishedAt,
    viewCount,
    thumbnailUrl,
  } = trendingVideoDetails
  const howOldVideo = new Date(publishedAt)
  const formattedDate = formatDistanceToNow(new Date(howOldVideo))

  return (
    <Link to={`/videos/${id}`} className="link-tending-videos">
      <li className="trending-videos-list-container">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="thumbnail-image"
        />
        <div className="trending-description-container">
          <p>{title}</p>
          <p>{name}</p>
          <div className="views-published-container">
            <p>{viewCount}views</p>
            <p>
              <BsDot className="dot" />
              {formattedDate}
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default TrendingVideoItem
