import './index.css'

const EmptyVideosView = () => (
  <div className="empty-videos-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
      alt="no saved videos"
      className="no-saved-videos-image"
    />
    <h3 className="no-saved-video-title">No saved videos found</h3>
    <p>You can save your videos while watching them</p>
  </div>
)

export default EmptyVideosView
