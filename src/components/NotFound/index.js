import Header from '../Header'
import SideButtons from '../SideButtons'

import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <SideButtons />
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        alt="not found"
        className="not-found-image"
      />
      <h3>Page Not Found</h3>
      <p>we are sorry, the page you requested could not be found.</p>
    </div>
  </div>
)

export default NotFound
