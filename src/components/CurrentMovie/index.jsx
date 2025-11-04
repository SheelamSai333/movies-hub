import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from "react-router"
import "./index.css"

const CurrentMovie = ({ movies, title, layout }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
  }

  return (
    <div
      className={`current-movie-container ${
        layout === "grid" ? "grid-layout" : ""
      }`}
    >
      <h2 className="current-movie-title">{title}</h2>

      {layout === "grid" ? (
        <div className="movies-grid">
          {movies.map((movie) => (
            <Link to = {`/home/movies/${movie.id}`}>
            <div key={movie.id} className="movie-card">
              <img
                src={movie.posterPath}
                alt={movie.title}
                className="movie-image"
              />
            </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="slider-container">
          <Slider {...settings}>
            {movies.map((movie) => (
              <Link to={`/home/movies/${movie.id}`}>
              <div key={movie.id}>
                <img
                  src={movie.posterPath}
                  alt={movie.title}
                  className="movie-poster"
                />
              </div>
              </Link>
            ))}
          </Slider>
        </div>
      )}
    </div>
  )
}

export default CurrentMovie
