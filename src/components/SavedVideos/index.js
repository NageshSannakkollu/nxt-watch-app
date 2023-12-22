import {BiListPlus} from 'react-icons/bi'
import Header from '../Header'
import SideButtons from '../SideButtons'
import SavedVideosContext from '../../context/SavedVideosContext'
import EmptyVideosView from '../EmptyVideosView'

import './index.css'
import TrendingVideoItem from '../TrendingVideoItem'

const SavedVideos = () => (
  <SavedVideosContext.Consumer>
    {value => {
      const {savedVideosList} = value
      const shouldShowEmptyVideosView = savedVideosList.length === 0
      return (
        <>
          <Header />
          <SideButtons />
          <div>
            {shouldShowEmptyVideosView ? (
              <EmptyVideosView />
            ) : (
              <div className="saved-videos-container" data-testid="savedVideos">
                <h1>
                  <BiListPlus />
                  Saved Videos
                </h1>
                <ul>
                  {savedVideosList.map(eachVideo => (
                    <TrendingVideoItem
                      trendingVideoDetails={eachVideo}
                      key={eachVideo.id}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )
    }}
  </SavedVideosContext.Consumer>
)

export default SavedVideos
