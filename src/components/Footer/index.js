import {Link} from 'react-router-dom'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <Link to="/" className="link footer-heading">
      <h1 className="footer-heading">
        COVID19<span className="footer-span ">INDIA</span>
      </h1>
    </Link>
    <p className="footer-description">
      we stand with everyone fighting on the front lines
    </p>
    <div className="footer-icons-containers">
      <VscGithubAlt className="footer-icon" testid="githubIcon" />
      <FiInstagram className="footer-icon" testid="instagramIcon" />
      <FaTwitter className="footer-icon" testid="twitterIcon" />
    </div>
  </div>
)

export default Footer
