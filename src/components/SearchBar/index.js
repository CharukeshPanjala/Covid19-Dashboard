import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import CovidContext from '../../Context/CovidContext'
import './index.css'

class SearchBar extends Component {
  state = {searchInput: ''}

  onChangeInput = async event => {
    await this.setState(
      {searchInput: event.target.value},
      this.renderSearchResults,
    )
  }

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="search-bar">
        <button className="search-button" type="button">
          <BsSearch className="search-icon" />
        </button>
        <input
          type="search"
          className="search-input"
          onChange={this.onChangeInput}
          value={searchInput}
          placeholder="Enter The State"
        />
      </div>
    )
  }

  renderSearchResults = () => (
    <CovidContext.Consumer>
      {value => {
        const {statesList} = value
        const {searchInput} = this.state
        const updatedList = statesList.filter(eachItem =>
          eachItem.state_name.toLowerCase().includes(searchInput.toLowerCase()),
        )
        console.log(updatedList)
        return (
          <ul
            className="state-results-list-container"
            testid="searchResultsUnorderedList"
          >
            {updatedList.map(eachItem => (
              <li key={eachItem.state_code} className="search-result-list">
                <Link
                  to={`/state/${eachItem.state_code}`}
                  className="search-result-list-item"
                >
                  <p className="search-bar-state-name disabled">
                    {eachItem.state_name}
                  </p>
                  <p className="search-bar-state-code disabled">
                    {eachItem.state_code}
                    <BiChevronRightSquare className="search-result-icon" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )
      }}
    </CovidContext.Consumer>
  )

  renderSearchBarContainer = () => {
    const {searchInput} = this.state
    return (
      <div className="search-bar-container">
        {this.renderSearchBar()}
        {searchInput.length !== 0 && this.renderSearchResults()}
      </div>
    )
  }

  render() {
    return <>{this.renderSearchBarContainer()}</>
  }
}

export default SearchBar
