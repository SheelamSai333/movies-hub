import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { BeatLoader } from "react-spinners"
import Cookies from "js-cookie"
import CurrentMovie from "../CurrentMovie"
import "./index.css"

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState(null)
  const [similarMovies,setSimilarMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const token = Cookies.get("jwt_token")
  const { id } = useParams()

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const api = `https://apis.ccbp.in/movies-app/movies/${id}`
      const response = await fetch(api, options)

      if (response.ok) {
        const data = await response.json()
        const movie = data.movie_details

        const formattedData = {
          adult: movie.adult,
          backdropPath: movie.backdrop_path,
          budget: movie.budget,
          genres: movie.genres,
          id: movie.id,
          overview: movie.overview,
          posterPath: movie.poster_path,
          releaseDate: movie.release_date,
          runtime: movie.runtime,
          similarMovies: movie.similar_movies,
          spokenLanguages: movie.spoken_languages,
          title: movie.title,
          voteAverage: movie.vote_average,
          voteCount: movie.vote_count,
        }

        setMovieDetails(formattedData)
        const similarMoviesFormattedData = movie.similar_movies.map(similar => ({
        backdropPath: similar.backdrop_path,
        id: similar.id,
        overview: similar.overview,
        posterPath: similar.poster_path,
        title: similar.title,
      }))
      setSimilarMovies(similarMoviesFormattedData)
            }
      setLoading(false)
    }

    fetchMovieDetails()
  }, [id, token])

  if (loading) {
    return (
      <div className="movie-details-loader">
        <BeatLoader color="#E50914" size={20} />
      </div>
    )
  }

  if (!movieDetails) {
    return <div className="movie-details-error">Movie not found.</div>
  }

  return (
    <div className="movie-details-container">
      {/* Banner Section */}
      <div
        className="movie-banner"
        style={{ backgroundImage: `url(${movieDetails.backdropPath})` }}
      >
        <div className="movie-banner-overlay">
          <div className="movie-banner-content">
            <h1 className="movie-title">{movieDetails.title}</h1>
            <div className="movie-meta">
              <span>
                {Math.floor(movieDetails.runtime / 60)}h {movieDetails.runtime % 60}m
              </span>
              <span className="ua-badge">U/A</span>
              <span>{movieDetails.releaseDate.split("-")[0]}</span>
            </div>
            <p className="movie-overview">{movieDetails.overview}</p>
            <button className="play-btn">▶ Play</button>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="movie-info-section">
        <div className="info-column">
          <h3>Genres</h3>
          <ul>
            {movieDetails.genres.map((g) => (
              <li key={g.id}>{g.name}</li>
            ))}
          </ul>
        </div>

        <div className="info-column">
          <h3>Audio Available</h3>
          <ul>
            {movieDetails.spokenLanguages.map((l) => (
              <li key={l.id}>{l.english_name}</li>
            ))}
          </ul>
        </div>

        <div className="info-column">
          <h3>Rating Count</h3>
          <p>{movieDetails.voteCount.toLocaleString()}</p>
          <h3>Rating Average</h3>
          <p>{movieDetails.voteAverage}</p>
        </div>

        <div className="info-column">
          <h3>Budget</h3>
          <p>{movieDetails.budget}</p>
          <h3>Release Date</h3>
          <p>{new Date(movieDetails.releaseDate).toDateString()}</p>
        </div>
      </div>

      {/* Similar Movies */}
      <div className="similar-section">
        <h2>More like this</h2>
        <CurrentMovie
          movies={similarMovies}
          title=""
          layout="grid"
        />
      </div>
    </div>
  )
}

export default MovieDetails
