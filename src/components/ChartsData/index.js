import {Component} from 'react'
import {
  BarChart,
  Bar,
  Tooltip,
  LabelList,
  XAxis,
  LineChart,
  Line,
  YAxis,
  ResponsiveContainer,
} from 'recharts'
import Loader from 'react-loader-spinner'
import './index.css'

class ChartsData extends Component {
  state = {
    timelineDetails: null,
    isLoading: true,
  }

  componentDidMount() {
    this.chartsData()
  }

  chartsData = async () => {
    const apiUrl = 'https://apis.ccbp.in/covid19-timelines-data/'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      this.setState({
        timelineDetails: data,
        isLoading: false,
      })
    }
  }

  renderLastTenDaysBarGraph = () => {
    const {timelineDetails} = this.state
    const {activeTab} = this.props
    if (timelineDetails === null) {
      return null
    }
    const key = Object.keys(timelineDetails)
    const {dates} = timelineDetails[key[0]]
    const datesArray = Object.keys(dates)
    datesArray.sort((a, b) => new Date(b) - new Date(a))
    const recentTenDays = datesArray.slice(0, 10)
    console.log(datesArray)
    const lastTenDaysData = []

    recentTenDays.forEach(date => {
      lastTenDaysData.push({date, ...dates[date].total})
    })

    const confirmedDataArray = []
    const activeDataArray = []
    const recoveredDataArray = []
    const deceasedDataArray = []

    lastTenDaysData.forEach(item => {
      confirmedDataArray.push({date: item.date, confirmed: item.confirmed})
      recoveredDataArray.push({date: item.date, recovered: item.recovered})
      deceasedDataArray.push({date: item.date, deceased: item.deceased})
      activeDataArray.push({
        date: item.date,
        active: item.confirmed - (item.deceased + item.recovered),
      })
    })
    const barGraphStylesandData = {
      CONFIRMED: {
        data: confirmedDataArray,
        color: '#9A0E31',
        dataKey: 'confirmed',
      },
      ACTIVE: {
        data: activeDataArray,
        color: '#0A4FA0',
        dataKey: 'active',
      },
      RECOVERED: {
        data: recoveredDataArray,
        color: '#216837',
        dataKey: 'recovered',
      },
      DECEASED: {
        data: deceasedDataArray,
        color: '#474C57',
        dataKey: 'deceased',
      },
    }

    return (
      <div className="bar-chart-state-container">
        <ResponsiveContainer className="bar-chart-component">
          <BarChart
            data={barGraphStylesandData[activeTab].data}
            margin={{top: 30, bottom: 30, left: 20, right: 20}}
          >
            <Bar
              dataKey={barGraphStylesandData[activeTab].dataKey}
              fill={barGraphStylesandData[activeTab].color}
            >
              <LabelList
                dataKey={barGraphStylesandData[activeTab].dataKey}
                style={{fontSize: '10px'}}
                position="top"
                fill={barGraphStylesandData[activeTab].color}
                formatter={item => {
                  if (item > 100000) {
                    return `${(item / 100000).toFixed(2)}L`
                  }
                  if (item > 1000) {
                    return `${(item / 1000).toFixed(2)}K`
                  }
                  return item
                }}
              />
              <LabelList
                style={{fontSize: '10px', fontWeight: '600'}}
                fill={barGraphStylesandData[activeTab].color}
                dataKey="date"
                position="bottom"
                formatter={item => {
                  const dateObj = new Date(item)
                  const options = {day: 'numeric', month: 'short'}
                  return dateObj.toLocaleString('en-GB', options)
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  renderTimelineCharts = () => {
    const {timelineDetails} = this.state
    if (timelineDetails === null) {
      return null
    }
    const key = Object.keys(timelineDetails)
    const {dates} = timelineDetails[key[0]]
    const datesArray = Object.keys(dates)

    const timelineDataArray = []

    datesArray.forEach(item => {
      timelineDataArray.push({
        date: item,
        confirmed: dates[item].total.confirmed,
        deceased: dates[item].total.deceased,
        recovered: dates[item].total.recovered,
        tested: dates[item].total.tested,
        active:
          dates[item].total.confirmed -
          (dates[item].total.deceased + dates[item].total.recovered),
      })
    })

    return (
      <div
        className="timeline-charts-parent-container"
        testid="lineChartsContainer"
      >
        <h1 className="daily-trends-heading">Daily Spread Trends</h1>
        <div className="timeline-charts-container confirmed-bg-color">
          <p className="timeline-chart-name confirmed-color">Confirmed</p>
          <ResponsiveContainer>
            <LineChart
              width={1430}
              height={400}
              data={timelineDataArray}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 35,
              }}
            >
              <XAxis
                style={{fontSize: '10px'}}
                strokeWidth={2}
                stroke="#FF073A"
                dataKey="date"
                interval={15}
                tickSize={10}
              />
              <YAxis
                style={{fontSize: '10px'}}
                type="number"
                domain={['dataMin-(dataMin+dataMax)/2', 'dataMax']}
                strokeWidth={2}
                stroke="#FF073A"
                tickSize={10}
                tickFormatter={item => {
                  if (item > 100000) {
                    return `${(item / 100000).toFixed(2)}L`
                  }
                  if (item > 1000 && item <= 100000) {
                    return `${(item / 1000).toFixed(2)}K`
                  }
                  return item
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="confirmed"
                stroke="#FF073A"
                dot={{fill: '#FF073A'}}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="timeline-charts-container active-bg-color">
          <p className="timeline-chart-name active-color">Total Active</p>
          <ResponsiveContainer>
            <LineChart
              width={1430}
              height={400}
              data={timelineDataArray}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 35,
              }}
            >
              <XAxis
                style={{fontSize: '10px'}}
                strokeWidth={2}
                stroke="#007BFF"
                dataKey="date"
                interval={15}
                tickSize={10}
              />
              <YAxis
                style={{fontSize: '10px'}}
                type="number"
                domain={['dataMin', 'dataMax']}
                strokeWidth={2}
                stroke="#007BFF"
                tickSize={10}
                tickFormatter={item => {
                  if (item > 100000) {
                    return `${(item / 100000).toFixed(2)}L`
                  }
                  if (item > 1000 && item <= 100000) {
                    return `${(item / 1000).toFixed(2)}K`
                  }
                  return item
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#007BFF"
                dot={{fill: '#007BFF'}}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="timeline-charts-container recovered-bg-color">
          <p className="timeline-chart-name recovered-color">Recovered</p>
          <ResponsiveContainer>
            <LineChart
              width={1430}
              height={400}
              data={timelineDataArray}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 35,
              }}
            >
              <XAxis
                style={{fontSize: '10px'}}
                strokeWidth={2}
                stroke="#27A243"
                dataKey="date"
                interval={15}
                tickSize={10}
              />
              <YAxis
                style={{fontSize: '10px'}}
                type="number"
                domain={['dataMin', 'dataMax']}
                strokeWidth={2}
                stroke="#27A243"
                tickSize={10}
                tickFormatter={item => {
                  if (item > 100000) {
                    return `${(item / 100000).toFixed(2)}L`
                  }
                  if (item > 1000 && item <= 100000) {
                    return `${(item / 1000).toFixed(2)}K`
                  }
                  return item
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="recovered"
                stroke="#27A243"
                dot={{fill: '#27A243'}}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="timeline-charts-container deceased-bg-color">
          <p className="timeline-chart-name deceased-color">Deceased</p>
          <ResponsiveContainer>
            <LineChart
              width={1430}
              height={400}
              data={timelineDataArray}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 35,
              }}
            >
              <XAxis
                style={{fontSize: '10px'}}
                strokeWidth={2}
                stroke="#6C757D"
                dataKey="date"
                interval={15}
                tickSize={10}
              />
              <YAxis
                style={{fontSize: '10px'}}
                type="number"
                domain={['dataMin', 'dataMax']}
                strokeWidth={2}
                stroke="#6C757D"
                tickSize={10}
                tickFormatter={item => {
                  if (item > 100000) {
                    return `${(item / 100000).toFixed(2)}L`
                  }
                  if (item > 1000 && item <= 100000) {
                    return `${(item / 1000).toFixed(2)}K`
                  }
                  return item
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="deceased"
                stroke="#6C757D"
                dot={{fill: '#6C757D'}}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="timeline-charts-container tested-bg-color">
          <p className="timeline-chart-name tested-color">Tested</p>
          <ResponsiveContainer>
            <LineChart
              width={1430}
              height={400}
              data={timelineDataArray}
              margin={{
                top: 30,
                right: 30,
                left: 20,
                bottom: 35,
              }}
            >
              <XAxis
                style={{fontSize: '10px'}}
                strokeWidth={2}
                stroke="#9673B9"
                dataKey="date"
                interval={15}
                tickSize={10}
              />
              <YAxis
                style={{fontSize: '10px'}}
                type="number"
                domain={['dataMin', 'dataMax']}
                strokeWidth={2}
                stroke="#9673B9"
                tickSize={10}
                tickFormatter={item => {
                  if (item > 100000) {
                    return `${(item / 100000).toFixed(2)}L`
                  }
                  if (item > 1000 && item <= 100000) {
                    return `${(item / 1000).toFixed(2)}K`
                  }
                  return item
                }}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="tested"
                stroke="#9673B9"
                dot={{fill: '#9673B9'}}
                strokeWidth={1}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        {isLoading ? (
          <div className="charts-bg-container" testid="timelinesDataLoader">
            <Loader type="Oval" color="#007BFF" height={50} width={50} />
          </div>
        ) : (
          <div className="charts-bg-container" testid="timelineDataLoader">
            {this.renderLastTenDaysBarGraph()}
            {this.renderTimelineCharts()}
          </div>
        )}
      </>
    )
  }
}

export default ChartsData
