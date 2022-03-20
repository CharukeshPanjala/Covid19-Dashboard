import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import CovidContext from '../../Context/CovidContext'
import SearchBar from '../SearchBar'
import CovidCasesCount from '../CovidCasesCount'
import './index.css'

class Home extends Component {
  state = {isLoading: true, data: [], sort: 'asc'}

  componentDidMount() {
    this.getHomeRouteData()
  }

  getHomeRouteData = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok) {
      await this.setState({isLoading: false, data})
    }
  }

  renderLoader = () => (
    <div testid="homeRouteLoader">
      <Loader type="TailSpin" color="blue" />
    </div>
  )

  onClickAscButton = async () => {
    await this.setState({sort: 'asc'}, this.renderHomeTable)
  }

  onClickDscButton = async () => {
    await this.setState({sort: 'dsc'}, this.renderHomeTable)
  }

  renderHomeTable = () => (
    <CovidContext.Consumer>
      {value => {
        const {statesList} = value
        let reverseList = [...statesList]
        reverseList = reverseList.reverse()
        const {data, sort} = this.state
        const updatedList = sort === 'asc' ? statesList : reverseList
        return (
          <ul className="home-details-table" testid="stateWiseCovidDataTable">
            <li className="headings-list-item" key="headings">
              <div className="first-title-container">
                <p className="first-title">States/UT</p>
                <button
                  type="button"
                  className="sort-button"
                  testid="ascendingSort"
                  onClick={this.onClickAscButton}
                >
                  <FcGenericSortingAsc className="sort-icon" />
                </button>
                <button
                  type="button"
                  className="sort-button"
                  testid="descendingSort"
                  onClick={this.onClickDscButton}
                >
                  <FcGenericSortingDesc className="sort-icon" />
                </button>
              </div>
              <p className="remaining-headings">Confirmed</p>
              <p className="remaining-headings">Active</p>
              <p className="remaining-headings">Recovered</p>
              <p className="remaining-headings">Deceased</p>
              <p className="remaining-headings">Population</p>
            </li>
            {updatedList.map(eachItem => {
              const eachState = data[eachItem.state_code]
              const {total} = eachState
              const {meta} = eachState
              return (
                <li
                  className="state-wise-data-lite-item"
                  key={eachItem.state_code}
                >
                  <p className="state-name-list-item">{eachItem.state_name}</p>
                  <p className="cases-count-list-item confirmed">
                    {total.confirmed}
                  </p>
                  <p className="cases-count-list-item active">
                    {total.confirmed - total.recovered}
                  </p>
                  <p className="cases-count-list-item recovered">
                    {total.recovered}
                  </p>
                  <p className="cases-count-list-item deceased">
                    {total.deceased}
                  </p>
                  <p className="cases-count-list-item population">
                    {meta.population}
                  </p>
                </li>
              )
            })}
          </ul>
        )
      }}
    </CovidContext.Consumer>
  )

  renderHomePage = () => {
    const {data} = this.state
    return (
      <div className="home-container">
        <SearchBar />
        <CovidCasesCount data={data} />
        <div className="table-container">{this.renderHomeTable()}</div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    const display = isLoading ? this.renderLoader() : this.renderHomePage()
    return display
  }
}

export default Home
