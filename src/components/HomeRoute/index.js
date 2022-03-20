import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import Home from '../Home'
import './index.css'

class HomeRoute extends Component {
  render() {
    return (
      <div className="home-route-container">
        <Header />
        <Home />
        <Footer />
      </div>
    )
  }
}

export default HomeRoute
