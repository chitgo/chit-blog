import { useNavigate } from 'react-router-dom'

function MostPopular({ blogs }) {
  const navigate = useNavigate()

  const handleClick = (itemId) => {
    navigate(`/detail/${itemId}`)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Scroll to the top of the page
  }

  return (
    <div className="px-2 py-8 space-y-2 dark:text-mainColor ">
      <h2 className="pb-4 text-2xl border-b-2 font-whisper">Most Popular</h2>
      {blogs?.map((item) => (
        <div
          key={item.id}
          onClick={() => handleClick(item.id)} // Call handleClick with item id
          className="grid grid-cols-2 gap-4 pt-2 cursor-pointer"
        >
          <div className="">
            <img
              src={item.imgUrl}
              alt={item.title}
              className="object-cover object-center w-full h-[100px] transition duration-300 ease-out hover:scale-110 rounded-xl lg:h-full "
            />
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <h2 className="font-semibold leading-5 tracking-tight capitalize sm:leading-4 sm:text-xs lg:text-base lg:leading-5 ">
              {item.title}
            </h2>
            <h3 className="text-xs sm:text-[10px] text-gray-500 dark:text-gray-300">
              {item.timestamp.toDate().toDateString()}
            </h3>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MostPopular
