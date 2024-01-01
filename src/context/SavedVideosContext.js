import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideosList: [],
  addToSavedVideos: () => {},
  activeTheme: 'false',
  changeTheme: () => {},
  deleteSavedVideo: () => {},
})
export default SavedVideosContext
