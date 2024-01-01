import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import VideoItemDetails from './components/VideoItemDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import SavedVideosContext from './context/SavedVideosContext'

import './App.css'

class App extends Component {
  state = {savedVideosList: [], activeTheme: 'false'}

  addToSavedVideos = video => {
    const {savedVideosList} = this.state
    localStorage.setItem('saved_videos', savedVideosList)
    const checkId = savedVideosList.find(eachId => eachId.id === video.id)
    console.log(checkId)
    if (checkId) {
      console.log(`CheckedID:${checkId}`)
    } else {
      console.log(`CheckedID:${checkId}`)
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, video],
      }))
    }
  }

  deleteSavedVideo = video => {
    const {savedVideosList} = this.state
    const finalSavedList = savedVideosList.filter(
      eachId => eachId.id !== video.id,
    )
    console.log(finalSavedList)
    this.setState({savedVideosList: finalSavedList})
  }

  changeTheme = () => {
    this.setState(prevState => ({activeTheme: !prevState.activeTheme}))
  }

  render() {
    const {activeTheme, savedVideosList} = this.state
    const backgroundTheme = activeTheme ? 'white' : 'dark'
    return (
      <BrowserRouter>
        <SavedVideosContext.Provider
          value={{
            savedVideosList,
            addToSavedVideos: this.addToSavedVideos,
            backgroundTheme,
            changeTheme: this.changeTheme,
            deleteSavedVideo: this.deleteSavedVideo,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </SavedVideosContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
