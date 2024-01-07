import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideosList: [],
  addToSavedVideos: () => {},
  activeTheme: 'false',
  changeTheme: () => {},
  deleteSavedVideo: () => {},
  homeButtonActive: true,
  trendingButtonActive: false,
  gamingButtonActive: false,
  savedVideosButtonActive: false,
  changeActiveHomeButtonStatus: () => {},
  changeActiveTrendingButtonStatus: () => {},
  changeActiveGamingButtonStatus: () => {},
  changeActiveSavedVideosButtonStatus: () => {},
})

export default SavedVideosContext
