import CovidContext from '../../Context/CovidContext'
import './index.css'

const CovidCasesCount = props => (
  <CovidContext.Consumer>
    {value => {
      const {statesList} = value
      const {data} = props
      let totalConfirmed = 0
      let totalRecovered = 0
      let totalDeceased = 0
      statesList.map(eachItem => {
        const eachState = data[eachItem.state_code]
        const {total} = eachState
        totalConfirmed += total.confirmed
        totalRecovered += total.recovered
        totalDeceased += total.deceased
        return null
      })
      return (
        <ul className="home-page-cases-count">
          <li
            className="home-page-cases-list-item confirmed"
            testid="countryWideConfirmedCases"
          >
            <p className="count-heading">Confirmed</p>
            <img
              src="https://res.cloudinary.com/devvekh18/image/upload/v1644514669/Group_r2jcab.png"
              alt="country wide confirmed cases pic"
              className="cases-card"
            />
            <p className="cases-count">{totalConfirmed}</p>
          </li>
          <li
            className="home-page-cases-list-item active"
            testid="countryWideActiveCases"
          >
            <p className="count-heading">Active</p>
            <img
              src="https://res.cloudinary.com/devvekh18/image/upload/v1644515023/protection_1_nqbvti.png"
              alt="country wide active cases pic"
              className="cases-card"
            />
            <p className="cases-count">{totalConfirmed - totalRecovered}</p>
          </li>
          <li
            className="home-page-cases-list-item recovered"
            testid="countryWideRecoveredCases"
          >
            <p className="count-heading">Recovered</p>
            <img
              src="https://res.cloudinary.com/devvekh18/image/upload/v1644515077/recovered_1_b9kbkd.png"
              alt="country wide recovered cases pic"
              className="cases-card"
            />
            <p className="cases-count">{totalRecovered}</p>
          </li>
          <li
            className="home-page-cases-list-item deceased"
            testid="countryWideDeceasedCases"
          >
            <p className="count-heading">Deceased</p>
            <img
              src="https://res.cloudinary.com/devvekh18/image/upload/v1644515119/breathing_1_t3l0o7.png"
              alt="country wide deceased cases pic"
              className="cases-card"
            />
            <p className="cases-count">{totalDeceased}</p>
          </li>
        </ul>
      )
    }}
  </CovidContext.Consumer>
)

export default CovidCasesCount
