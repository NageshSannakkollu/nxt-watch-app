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
  state = {savedVideosList: [], activeTheme: 'white'}

  addToSavedVideos = video => {
    this.setState(prevState => ({
      savedVideosList: [...prevState.savedVideosList, video],
    }))
  }

  deleteSavedVideo = video => {
    const {savedVideosList} = this.state
    const filteredSavedVideo = savedVideosList.filter(
      eachVideo => eachVideo.id !== video.id,
    )
    this.setState({filteredSavedVideo: savedVideosList})
  }

  render() {
    const {savedVideosList, activeTheme} = this.state
    console.log(savedVideosList)
    return (
      <BrowserRouter>
        <SavedVideosContext.Provider
          value={{
            savedVideosList,
            addToSavedVideos: this.addToSavedVideos,
            activeTheme,
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
