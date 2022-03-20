import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class AboutRoute extends Component {
  state = {isLoading: true, faq: [], factoids: []}

  componentDidMount() {
    this.getAboutRouteData()
  }

  getAboutRouteData = async () => {
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(url)
    const data = await response.json()
    const {factoids} = data
    const {faq} = data
    this.setState({factoids, faq, isLoading: false})
  }

  renderFaqs = () => {
    const {faq} = this.state
    return (
      <ul className="faqs-list" testid="faqsUnorderedList">
        {faq.map(eachItem => (
          <li className="faq-list-item" key={eachItem.question}>
            <p className="faq-question">{eachItem.question}</p>
            <p className="faq-answer">{eachItem.answer}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderFactoids = () => {
    const {factoids} = this.state
    console.log(factoids)

    return (
      <ul className="factoids-list" testid="factoidsUnorderedList">
        {factoids.map(eachItem => (
          <li className="factoids-list-item" key={eachItem.banner}>
            <p className="factoid">{eachItem.banner}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderAboutRouteDetails = () => (
    <div className="about-details">
      <h1 className="about-route-heading">About</h1>
      <p className="faq-question">Last update on march 28th 2021.</p>
      <p className="sub-heading">COVID-19 vaccines be ready for distribution</p>
      {this.renderFaqs()}
    </div>
  )

  renderLoader = () => (
    <div testid="aboutRouteLoader">
      <Loader color="blue" type="TailSpin" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="about-route-container">
        <Header />
        {isLoading ? this.renderLoader() : this.renderAboutRouteDetails()}
        <Footer />
      </div>
    )
  }
}

export default AboutRoute
