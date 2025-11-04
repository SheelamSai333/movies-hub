import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { BeatLoader } from "react-spinners"
import CurrentMovie from "../CurrentMovie"

const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
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
        "https://apis.ccbp.in/movies-app/trending-movies",
        options
      )

      if (response.ok) {
        const data = await response.json()
        const formattedData = data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          posterPath: movie.poster_path,
          backdropPath: movie.backdrop_path,
        }))
        setTrendingMovies(formattedData)
      }

      setLoading(false)
    }

    fetchingData()
  }, [])

  return (
    <div
      style={{
        backgroundColor: "black",
        padding: "40px 0",
        minHeight: "250px",
      }}
    >
      {loading ? (
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
        <CurrentMovie title="Trending Now" movies={trendingMovies} layout="slider" />

      )}
    </div>
  )
}

export default TrendingMovies
