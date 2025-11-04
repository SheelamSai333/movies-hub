import {  useEffect, useState } from "react"
import Cookies from "js-cookie"
import BannerSlick from "../BannerSlick"
import './index.css'
const Banner = ()=>{
     const [banner,setBanner] = useState([])
     const token = Cookies.get("jwt_token")

    
    useEffect(()=>{
    const topRatedMovies = async ()=>{
    const options = {
        method:"GET",
        headers:{
            Authorization: `Bearer ${token}`
        }
     }
        const response = await fetch("https://apis.ccbp.in/movies-app/top-rated-movies",options)
        const data = await response.json()
        
        
       
        const formattedData = data.results.map(movie => ({
          backdropPath: movie.backdrop_path,
          id: movie.id,
          overview: movie.overview,
          posterPath: movie.poster_path,
          title: movie.title,
        }));
        setBanner(formattedData)
    }
    topRatedMovies()
},[token])
    return (
    <div>
      {banner.length > 0 ? (<BannerSlick banners={banner}/>) : (
  ""
)}

    </div>
  );
}



export default Banner;
