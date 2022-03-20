import './index.css'

const StatsCards = props => {
  const {
    confirmed,
    active,
    deceased,
    recovered,
    activeTab,
    changeActiveTab,
  } = props

  const setActiveTabAsActive = () => {
    changeActiveTab('ACTIVE')
  }

  const setActiveTabAsConfirmed = () => {
    changeActiveTab('CONFIRMED')
  }

  const setActiveTabAsRecovered = () => {
    changeActiveTab('RECOVERED')
  }

  const setActiveTabAsDeceased = () => {
    changeActiveTab('DECEASED')
  }

  return (
    <div className="stats-card-container">
      <button
        onClick={setActiveTabAsConfirmed}
        type="button"
        className={`stats-card confirmed-color ${
          activeTab === 'CONFIRMED' && 'confirmed-active'
        }`}
        testid="countryWideConfirmedCases"
      >
        <p className="stat-card-title">Confirmed</p>
        <img
          src="https://res.cloudinary.com/devvekh18/image/upload/v1644514669/Group_r2jcab.png"
          alt="country wide confirmed cases pic"
        />
        <p className="stat-card-count">{confirmed}</p>
      </button>

      <button
        onClick={setActiveTabAsActive}
        type="button"
        className={`stats-card active-color ${
          activeTab === 'ACTIVE' && 'active-active'
        }`}
        testid="countryWideActiveCases"
      >
        <p className="stat-card-title">Active</p>
        <img
          src="https://res.cloudinary.com/devvekh18/image/upload/v1644515023/protection_1_nqbvti.png"
          alt="country wide active cases pic"
        />
        <p className="stat-card-count">{active}</p>
      </button>

      <button
        onClick={setActiveTabAsRecovered}
        type="button"
        className={`stats-card recovered-color ${
          activeTab === 'RECOVERED' && 'recovered-active'
        }`}
        testid="countryWideRecoveredCases"
      >
        <p className="stat-card-title">Recovered</p>
        <img
          src="https://res.cloudinary.com/devvekh18/image/upload/v1644515077/recovered_1_b9kbkd.png"
          alt="country wide recovered cases pic"
        />
        <p className="stat-card-count">{recovered}</p>
      </button>
      <button
        onClick={setActiveTabAsDeceased}
        type="button"
        className={`stats-card deceased-color ${
          activeTab === 'DECEASED' && 'deceased-active'
        }`}
        testid="countryWideDeceasedCases"
      >
        <p className="stat-card-title">Deceased</p>
        <img
          src="https://res.cloudinary.com/devvekh18/image/upload/v1644515119/breathing_1_t3l0o7.png"
          alt="country wide deceased cases pic"
        />
        <p className="stat-card-count">{deceased}</p>
      </button>
    </div>
  )
}
export default StatsCards
