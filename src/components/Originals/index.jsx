import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { BeatLoader } from "react-spinners"
// import OriginalSlick from "../OriginalSlick"
import CurrentMovie from "../CurrentMovie"

const OriginalMovies = () => {
  const [originalMovies, setOriginalMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const jwt_token = Cookies.get("jwt_token")
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt_token}`,
      },
    }

    const fetchingData = async () => {
      const response = await fetch(
        "https://apis.ccbp.in/movies-app/originals",
        options
      )

      if (response.ok) {
        const data = await response.json()
        const formattedData = data.results.map((movie) => ({
          backdropPath: movie.backdrop_path,
          id: movie.id,
          overview: movie.overview,
          posterPath: movie.poster_path,
          title: movie.title,
        }))
        setOriginalMovies(formattedData)
      }

      setLoading(false)
    }

    fetchingData()
  }, [])

  return (
    <div
      style={{
        backgroundColor: "black",
        padding: "10px 0",
        minHeight: "250px",
      }}
    >
      

      {loading ? (
        // ✅ Show loader while fetching
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <BeatLoader color="#E50914" size={15} margin={4} />
        </div>
      ) : (
        // ✅ Show slider when loaded
       <CurrentMovie title="Originals" movies={originalMovies} layout="slider" />

      )}
    </div>
  )
}

export default OriginalMovies
