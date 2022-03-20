import './index.css'

const NotFound = props => {
  const onClickHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/devvekh18/image/upload/v1643639134/Vector_dgmeby.jpg"
        alt="not-found-pic"
        className="not-found-image"
      />
      <h1 className="not-found-heading">PAGE NOT FOUND</h1>
      <p className="not-found-paragraph">
        we’re sorry, the page you requested could not be found
        <br />
        Please go back to the homepage
      </p>
      <button className="home-button" type="button" onClick={onClickHome}>
        Home
      </button>
    </div>
  )
}

export default NotFound
