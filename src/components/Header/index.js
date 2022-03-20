import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {RiCloseCircleFill} from 'react-icons/ri'
import './index.css'

const OptionsList = [
  {id: '/', name: 'Home'},
  {id: '/about', name: 'About'},
]

class Header extends Component {
  state = {showMenu: false}

  onClickMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  renderOptions = () => {
    const {match} = this.props
    const {path} = match
    return (
      <ul className="nav-bar-list">
        {OptionsList.map(eachItem => {
          const selectedOption = eachItem.id === path ? 'selected-option' : ''
          return (
            <li key={eachItem.name}>
              <Link
                to={eachItem.id}
                className={`nav-bar-list-item link ${selectedOption}`}
              >
                {eachItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const {showMenu} = this.state
    return (
      <>
        <nav className="navbar">
          <h1 className="navbar-heading">
            <Link to="/" className="link navbar-heading">
              COVID19<span className="navbar-span">INDIA</span>
            </Link>
          </h1>
          <div className="options-lg">{this.renderOptions()}</div>
          <button
            className="menu-button"
            type="button"
            onClick={this.onClickMenu}
          >
            <img
              src="https://res.cloudinary.com/devvekh18/image/upload/v1643734394/add-to-queue_1_1_nxri1e.png"
              alt="menu icon"
              className="icon"
            />
          </button>
        </nav>
        {showMenu && (
          <div className="nav-sm-menu">
            {this.renderOptions()}
            <button
              className="menu-button"
              type="button"
              onClick={this.onClickMenu}
            >
              <RiCloseCircleFill className="selected-option icon" />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
