import React from 'react'
import Banner from '../Banner'
import TrendingMovies from '../Trending'
import OriginalMovies from '../Originals'

function HomePage() {
  return (
    <div>
      <Banner/>
      <TrendingMovies/>
      <OriginalMovies/>
    </div>
  )
}

export default HomePage
