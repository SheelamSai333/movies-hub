import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

function BannerSlick({ banners = [] }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    fade: true,
  }

  if (!banners || banners.length === 0) {
    return (
      <div className="flex items-center justify-center h-[90vh] bg-black text-white">
        Loading banners...
      </div>
    )
  }

  return (
    <div className="relative w-full h-[90vh] pb-2 overflow-hidden">
      <Slider {...settings} className="h-full">
        {banners.map((banner) => (
          <div key={banner.id} className="relative w-full h-[100vh]">
            {/* Background image */}
            <img
              src={banner.backdropPath}
              alt={banner.title}
              className="w-full h-full object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Text and button — absolute inside same relative div */}
            <div className="absolute bottom-24 left-12 max-w-2xl">
              <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {banner.title}
              </h1>
              <p className="text-lg text-gray-300 mb-6 drop-shadow-md">
                {banner.overview}
              </p>
              <button className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-300 transition">
                ▶ Play
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default BannerSlick
