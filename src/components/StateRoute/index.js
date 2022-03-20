import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import StatsCards from '../StatsCards'
import TopDistrictsData from '../TopDistrictsData'
import CovidContext from '../../Context/CovidContext'
import ChartsData from '../ChartsData'
import './index.css'

const tabDetails = {
  confirmed: 'CONFIRMED',
  active: 'ACTIVE',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
}

class StateRoute extends Component {
  state = {
    isLoading: true,
    caseDetails: null,
    activeTab: tabDetails.confirmed,
  }

  componentDidMount() {
    this.getData()
  }

  changeActiveTab = async val => {
    await this.setState({activeTab: val}, this.renderStateData)
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const fetchUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(fetchUrl)
    const data = await response.json()
    const stateData = data[id]
    await this.setState({
      caseDetails: stateData,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div testid="stateRouteLoader">
      <Loader type="TailSpin" color="blue" />
    </div>
  )

  renderStateData = () => (
    <>
      {this.renderStateMetaData()}
      {this.renderStateStatistics()}
      {this.renderTopDistrictsData()}
      {this.renderChartsData()}
    </>
  )

  renderStateMetaData = () => {
    const {caseDetails} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <CovidContext.Consumer>
        {value => {
          const {meta, total} = caseDetails
          const lastUpdated = new Date(meta.last_updated)
          const {tested} = total
          const {statesList} = value
          const name = statesList.find(item => item.state_code === id)
            .state_name
          return (
            <>
              <div className="first-container">
                <div className="state-name-container">
                  <h1 className="state-name">{name}</h1>
                  <p className="last-updated">
                    {`Last update on ${lastUpdated.toDateString()}`}
                  </p>
                </div>
                <div className="tested-container">
                  <p className="tested-name">Tested</p>
                  <p className="tested">{tested}</p>
                </div>
              </div>
            </>
          )
        }}
      </CovidContext.Consumer>
    )
  }

  renderStateStatistics = () => {
    const {caseDetails, activeTab} = this.state
    const {total} = caseDetails
    const {confirmed, deceased, recovered} = total
    return (
      <StatsCards
        confirmed={confirmed}
        deceased={deceased}
        recovered={recovered}
        active={confirmed - (deceased + recovered)}
        activeTab={activeTab}
        forStateDetails
        changeActiveTab={this.changeActiveTab}
      />
    )
  }

  renderTopDistrictsData = () => {
    const {caseDetails, activeTab} = this.state
    return <TopDistrictsData caseDetails={caseDetails} activeTab={activeTab} />
  }

  renderChartsData = () => {
    const {activeTab} = this.state
    return <ChartsData activeTab={activeTab} />
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="state-route-container">
        <Header />
        {isLoading ? this.renderLoader() : this.renderStateData()}
        <Footer />
      </div>
    )
  }
}

export default StateRoute
