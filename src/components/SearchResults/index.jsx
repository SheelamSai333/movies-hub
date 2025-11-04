import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Cookies from 'js-cookie'
import { BeatLoader } from 'react-spinners'
import CurrentMovie from '../CurrentMovie'
import './index.css'

function SearchResults() {
  const location = useLocation()
  const query = new URLSearchParams(location.search).get("search") || ""
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")  

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query.trim()) return 

      const token = Cookies.get("jwt_token")
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      try {
        const response = await fetch(
          `https://apis.ccbp.in/movies-app/movies-search?search=${query}`,
          options
        )

        if (response.ok) {
          const data = await response.json()
          const movie = data.results || []

          if (movie.length === 0) {
            setError(`Your search for ${query} did not found any matches.`)
            setMovies([])
          } else {
            const formattedData = movie.map((m) => ({
              backdropPath: m.backdrop_path,
              id: m.id,
              overview: m.overview,
              posterPath: m.poster_path,
              title: m.title,
            }))
            setMovies(formattedData)
            setError("") 
          }
        } else {
          setError("Failed to fetch movies. Please try again.")
        }
      } catch (err) {
        setError("Something went wrong. Please check your connection.")
      }

      setLoading(false)
    }

    setLoading(true)
    setError("")
    fetchMovies()
  }, [query]) // 

  return (
    <div style={{ backgroundColor: "black", padding: "40px 0", minHeight: "300px" }}>
      {loading ? (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}>
          <BeatLoader color="#E50914" size={15} margin={4} />
        </div>
      ) : error ? (
        <div className='error-msg'>
            <img src='https://res.cloudinary.com/dquu2hthg/image/upload/v1761985250/Group_7394_dq0sgd.png'/>
            <p style={{
          color: "white",
          textAlign: "center",
          fontSize: "18px",
          marginTop: "50px",
        }}>
          {error}
        </p>
        </div>
      ) : (
        <CurrentMovie movies={movies} layout="grid" />
      )}
    </div>
  )
}

export default SearchResults
