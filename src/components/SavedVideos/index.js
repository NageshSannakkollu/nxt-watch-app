import {BiListPlus} from 'react-icons/bi'
import Header from '../Header'
import SideButtons from '../SideButtons'
import SavedVideosContext from '../../context/SavedVideosContext'
import EmptyVideosView from '../EmptyVideosView'

import './index.css'
import SavedVideoItem from '../SavedVideoItem'

const SavedVideos = () => (
  <SavedVideosContext.Consumer>
    {value => {
      const {savedVideosList, backgroundTheme} = value
      const savedDarkBackground =
        backgroundTheme === 'dark' ? 'saved-dark-background' : ''
      const shouldShowEmptyVideosView = savedVideosList.length === 0
      const savedVideoIconColor =
        backgroundTheme === 'dark' ? 'saved-red-icon' : ''
      const savedVideosHeadingDarkMode =
        backgroundTheme === 'dark' ? 'heading-dark-mode' : ''
      return (
        <>
          <Header />
          <div className="saved-videos">
            <SideButtons />
            <div
              className={`saved-videos-main-container ${savedDarkBackground}`}
            >
              {shouldShowEmptyVideosView ? (
                <EmptyVideosView />
              ) : (
                <div
                  className="saved-videos-container"
                  data-testid="savedVideos"
                >
                  <div
                    className={`saved-videos-heading ${savedVideosHeadingDarkMode}`}
                  >
                    <BiListPlus
                      className={`saved-videos-icon ${savedVideoIconColor}`}
                    />
                    <h1>Saved Videos</h1>
                  </div>
                  <ul className="saved-videos-list">
                    {savedVideosList.map(eachVideo => (
                      <SavedVideoItem
                        savedVideoDetails={eachVideo}
                        key={eachVideo.id}
                      />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </>
      )
    }}
  </SavedVideosContext.Consumer>
)

export default SavedVideos
