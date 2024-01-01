import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import './index.css'

const SavedVideoItem = props => {
  const {savedVideoDetails} = props
  const {
    title,
    id,
    name,
    publishedAt,
    viewCount,
    thumbnailUrl,
  } = savedVideoDetails
  const howOldVideo = new Date(publishedAt)
  const formattedDate = formatDistanceToNow(new Date(howOldVideo))

  return (
    <Link to={`/videos/${id}`} className="link-gaming-videos">
      <li className="gaming-list-item-container">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="saved-thumbnail-image"
        />
        <div>
          <p key={title}>{title}</p>
          <p key={name}>{name}</p>
          <div className="views-published-container">
            <p key={viewCount}>{viewCount}views</p>
            <p key={publishedAt}>
              <BsDot className="dot" />
              {formattedDate}
            </p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SavedVideoItem
