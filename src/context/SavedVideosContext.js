import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideosList: [],
  addToSavedVideos: () => {},
  activeTheme: 'white',
  changeTheme: () => {},
  deleteSavedVideo: () => {},
})
export default SavedVideosContext
