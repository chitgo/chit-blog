import { Link } from 'react-router-dom'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { lazy } from 'react'
function Trending({ blogs }) {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    cssEase: 'linear',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  }

  return (
    <div className="px-4">
      <h2 className="py-2 text-2xl italic border-b-2 font-whisper">Trending</h2>
      <Slider className="pt-4 pb-4 mb-4 " {...settings}>
        {blogs?.map((item) => (
          <div className="h-[200px]  " key={item.id}>
            <Link to={`/detail/${item.id}`}>
              <div className="relative m-2 ">
                <div className="">
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="h-[200px] w-full object-cover object-center  brightness-50 rounded-xl "
                  />
                </div>
                <div className="absolute bottom-4 left-[50%] translate-x-[-50%] w-full">
                  <div className="gap-2 font-bold text-center text-mainColor">
                    <p className="text-sm leading-4 capitalize">{item.title}</p>
                    <div className="mt-1 text-xs text-gray-300 capitalize">
                      {item.author} - {item.timestamp.toDate().toDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  )
}
export default Trending
