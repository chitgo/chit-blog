import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { MdLightMode, MdNightlightRound } from 'react-icons/md'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { toast } from 'react-toastify'
function Header({ user, handleLogout, handleDarkMode, isDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const userId = user?.uid

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogoutClick = () => {
    handleLogout()
    setIsMenuOpen(false)
  }

  return (
    <nav className="p-4 px-8 mx-auto md:px-16 max-w-screen-2xl dark:bg-smoky dark:text-white">
      <ul className="flex items-center justify-between gap-4">
        <div className="">
          <Link to="/">
            <h1
              className="text-2xl font-whisper"
              onClick={() => setIsMenuOpen(false)}
            >
              Chit-Blog
            </h1>
          </Link>
        </div>
        <div className="items-center hidden gap-6 text-lg sm:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/create">Create</NavLink>
        </div>

        <div className="items-center hidden gap-4 sm:flex ">
          {userId ? (
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="logo"
                className="rounded-full w-7 h-7"
              />

              <p className="capitalize ">{user?.displayName}</p>
              <Link to="/auth" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          ) : (
            <NavLink to="/auth" className="text-lg">
              Login
            </NavLink>
          )}
          {isDarkMode ? (
            <div className="p-1 rounded-full hover:bg-[#B9D2FB]">
              <MdLightMode
                className="text-2xl cursor-pointer"
                onClick={handleDarkMode}
              />
            </div>
          ) : (
            <div className="p-1 rounded-full hover:bg-[#B9D2FB]">
              <MdNightlightRound
                className="text-2xl rounded-full cursor-pointer "
                onClick={handleDarkMode}
              />
            </div>
          )}
        </div>

        {/* mobile menu */}
        <div className="flex items-center gap-4 text-2xl sm:hidden">
          {isMenuOpen ? (
            <AiOutlineClose
              className="cursor-pointer"
              onClick={handleMenuClick}
            />
          ) : (
            <AiOutlineMenu
              className="cursor-pointer"
              onClick={handleMenuClick}
            />
          )}

          <div className="">
            {isDarkMode ? (
              <div className="p-1 rounded-full hover:bg-[#B9D2FB]">
                <MdLightMode
                  className="cursor-pointer"
                  onClick={handleDarkMode}
                />
              </div>
            ) : (
              <div className="p-1 rounded-full hover:bg-[#B9D2FB]">
                <MdNightlightRound
                  className="cursor-pointer"
                  onClick={handleDarkMode}
                />
              </div>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="absolute right-0 z-10 flex flex-col w-full py-8 bg-white border border-gray-300 shadow-md top-16 dark:bg-smoky dark:text-mainColor dark:border-gray-800">
            {userId && (
              <div className="flex gap-4 py-1 mx-auto mt-4 text-2xl cursor-pointer">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="logo"
                  className="rounded-full w-7 h-7"
                />

                <p className="capitalize">{user?.displayName}</p>
              </div>
            )}
            <NavLink
              to="/"
              onClick={handleMenuClick}
              className="py-1 mx-auto text-2xl"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={handleMenuClick}
              className="py-1 mx-auto text-2xl"
            >
              About
            </NavLink>
            <NavLink
              to="/create"
              onClick={handleMenuClick}
              className="py-1 mx-auto text-2xl"
            >
              Create
            </NavLink>
            {userId ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/auth"
                  onClick={handleLogoutClick}
                  className="py-1 mx-auto text-2xl"
                >
                  Logout
                </Link>
              </div>
            ) : (
              <NavLink
                to="/auth"
                onClick={handleMenuClick}
                className="py-1 mx-auto text-2xl"
              >
                Login
              </NavLink>
            )}
          </div>
        )}
      </ul>
    </nav>
  )
}

export default Header
