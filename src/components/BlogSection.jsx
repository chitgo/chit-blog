import { Link } from 'react-router-dom'
import { excerpt } from '../utility/index'
import { FaTrash, FaEdit } from 'react-icons/fa'

function BlogSection({ blogs, user, timestamp, handleDelete }) {
  const userId = user?.uid
  return (
    <section className="max-w-screen-2xl">
      <div className="py-4">
        <div className="grid grid-cols-1 px-5 sm:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-12">
          {blogs.map((item) => {
            return (
              <div key={item.id} className="flex flex-col mb-4 ">
                <div className="">
                  <Link to={`/detail/${item.id}`} className="">
                    <img
                      src={item.imgUrl}
                      alt={item.title}
                      className="object-cover object-center transition duration-300 ease-out hover:scale-110 rounded-xl aspect-video h-[200px] w-full"
                    />
                  </Link>
                </div>
                <div className="pt-4">
                  <span className="px-2 py-1 text-xs font-medium tracking-wider text-white uppercase rounded-md bg-violet-500">
                    {item.category}
                  </span>
                </div>

                <div className="pt-4 text-sm">
                  <span className="font-semibold capitalize ">
                    {item.author}{' '}
                  </span>
                  -{' '}
                  <span className="text-sm font-light text-gray-400">
                    {item.timestamp.toDate().toDateString()}
                  </span>
                </div>

                <div className="flex flex-col flex-grow pt-4 ">
                  <div className="flex flex-col flex-grow mt-2">
                    <h3 className="text-xl capitalize cursor-pointer bg-gradient-to-r from-violet-300 to-violet-200 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900 self-start leading-snug tracking-tight font-medium">
                      {item.title}
                    </h3>
                    <p className="pb-4 ">{excerpt(item.description, 140)}</p>
                    <div className="flex items-end justify-between mt-auto">
                      <Link
                        to={`/detail/${item.id}`}
                        className="px-2 py-1 text-sm font-normal text-black transition duration-700 ease-in-out bg-transparent border-2 border-black rounded-full hover:bg-black hover:text-white hover:border-transparent dark:bg-violet-500 dark:text-white dark:border-violet-500 dark:hover:bg-white dark:hover:text-violet-500 dark:hover:border-violet-500 "
                      >
                        Read More
                      </Link>
                      {userId && item.userId === userId && (
                        <div className="flex gap-2 ">
                          <FaTrash
                            className="text-2xl text-red-500 transition duration-300 cursor-pointer hover:-translate-y-1"
                            onClick={() => handleDelete(item.id)}
                          />
                          <Link to={`/update/${item.id}`}>
                            <FaEdit className="text-2xl text-red-400 transition duration-300 cursor-pointer hover:-translate-y-1" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
export default BlogSection
