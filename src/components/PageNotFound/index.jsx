import { useNavigate } from "react-router-dom"
import "./index.css"

const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="pagenotfound">
      <h1>LOST YOUR WAY?</h1>
      <p>
        We’re sorry, the page you requested could not be found<br />
        Please go back to the homepage.
      </p>
      <button onClick={() => navigate("/home")}>Go to Home</button>
    </div>
  )
}

export default PageNotFound
