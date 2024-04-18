import { useState, useEffect } from 'react'
import Home from './pages/Home'
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  BrowserRouter as Router,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Detail from './pages/Detail'
import AddEditBlog from './pages/AddEditBlog'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Auth from './pages/Auth'
import Header from './components/Header'
import { auth } from './firebase'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'

function App() {
  const [user, setUser] = useState(null)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('colorPreference') === 'dark'
  })

  const handleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
  }, [])

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null)
        localStorage.removeItem('colorPreference')
        toast.success('Logged out successfully')
      })
      .catch((error) => {
        console.error('Logout error:', error)
        toast.error('Failed to logout. Please try again.')
      })
  }

  useEffect(() => {
    const savedColorPreference = localStorage.getItem('colorPreference')
    if (savedColorPreference) {
      setIsDarkMode(savedColorPreference === 'dark')
    }

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    localStorage.setItem('colorPreference', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  return (
    <div className={`${isDarkMode && 'dark'}  `}>
      <div className="dark:bg-smoky">
        <Router>
          <Header
            user={user}
            handleLogout={handleLogout}
            handleDarkMode={handleDarkMode}
            isDarkMode={isDarkMode}
          />
          <ToastContainer position="top-center" />
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/search" element={<Home user={user} />} />
            <Route path="/detail/:id" element={<Detail user={user} />} />
            <Route
              path="/create"
              element={
                user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/" />
              }
            />
            <Route
              path="/update/:id"
              element={
                user?.uid ? (
                  <AddEditBlog user={user} />
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />

            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth setUser={setUser} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
