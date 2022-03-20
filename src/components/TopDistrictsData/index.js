import './index.css'

const TopDistrictsData = props => {
  const {caseDetails, activeTab} = props
  const confirmedDistrictData = []
  const activeDistrictData = []
  const recoveredDistrictData = []
  const deceasedDistrictData = []

  const {districts} = caseDetails
  const districtNames = Object.keys(districts)
  districtNames.forEach(keyName => {
    const districtName = keyName
    const confirmedCases = districts[keyName].total.confirmed
    const recoveredCases = districts[keyName].total.recovered
    const deceasedCases = districts[keyName].total.deceased
    const activeCases = confirmedCases - (recoveredCases + deceasedCases)

    confirmedDistrictData.push({
      districtName,
      confirmedCases,
    })

    recoveredDistrictData.push({
      districtName,
      recoveredCases,
    })

    deceasedDistrictData.push({
      districtName,
      deceasedCases,
    })

    activeDistrictData.push({
      districtName,
      activeCases,
    })
  })

  confirmedDistrictData.sort((a, b) => b.confirmedCases - a.confirmedCases)
  activeDistrictData.sort((a, b) => b.activeCases - a.activeCases)
  deceasedDistrictData.sort((a, b) => b.deceasedCases - a.deceasedCases)
  recoveredDistrictData.sort((a, b) => b.recoveredCases - a.recoveredCases)

  return (
    <div className="top-districts-container">
      <h1 className="top-districts-heading">Top Districts</h1>
      {activeTab === 'CONFIRMED' && (
        <ul
          className="top-districts-list-container"
          testid="topDistrictsUnorderedList"
        >
          {confirmedDistrictData.map(item => (
            <li key={item.districtName} className="district-list-item">
              <p className="district-stats-count">
                {item.confirmedCases || 'NA'}
              </p>
              <p className="district-name">{item.districtName}</p>
            </li>
          ))}
        </ul>
      )}

      {activeTab === 'ACTIVE' && (
        <ul className="top-districts-list-container">
          {activeDistrictData.map(item => (
            <li key={item.districtName} className="district-list-item">
              <p className="district-stats-count">{item.activeCases || 'NA'}</p>
              <p className="district-name">{item.districtName}</p>
            </li>
          ))}
        </ul>
      )}

      {activeTab === 'DECEASED' && (
        <ul className="top-districts-list-container">
          {deceasedDistrictData.map(item => (
            <li key={item.districtName} className="district-list-item">
              <p className="district-stats-count">
                {item.deceasedCases || 'NA'}
              </p>
              <p className="district-name">{item.districtName}</p>
            </li>
          ))}
        </ul>
      )}

      {activeTab === 'RECOVERED' && (
        <ul className="top-districts-list-container">
          {recoveredDistrictData.map(item => (
            <li key={item.districtName} className="district-list-item">
              <p className="district-stats-count">
                {item.recoveredCases || 'NA'}
              </p>
              <p className="district-name">{item.districtName}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default TopDistrictsData
