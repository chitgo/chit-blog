import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const Auth = ({ setUser }) => {
  const [state, setState] = useState(initialState)
  const [signUp, setSignUp] = useState(false)

  const { email, password, firstName, lastName, confirmPassword } = state

  const navigate = useNavigate()

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    if (!signUp) {
      if (email && password) {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        setUser(user)
        toast.success('Login successful')
      } else {
        return toast.error('All fields are mandatory to fill')
      }
    } else {
      if (password !== confirmPassword) {
        return toast.error("Password don't match")
      }
      if (firstName && lastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        await updateProfile(user, { displayName: `${firstName} ${lastName}` })
      } else {
        return toast.error('All fields are mandatory to fill')
      }
    }
    navigate('/')
  }

  return (
    <div className="flex flex-col flex-1 h-screen min-h-full p-6 lg:px-8 dark:bg-smoky dark:text-mainColor">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900 dark:text-mainColor">
          {signUp ? 'Create a new account' : 'Sign in to your account'}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <form className="space-y-4" onSubmit={handleAuth}>
          {signUp && (
            <div className="items-center gap-4 sm:flex">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-mainColor"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="firstName"
                    value={firstName}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                  />
                </div>
              </div>

              <div className="mt-4 sm:mt-0">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-mainColor"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="lastName"
                    value={lastName}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-mainColor"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-mainColor"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {signUp && (
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-mainColor"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="confirm-password"
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className={`${
                signUp
                  ? 'bg-red-500 hover:bg-red-500 focus:outline-indigo-500'
                  : 'bg-indigo-500 hover:bg-indigo-500 focus:outline-indigo-600'
              } flex w-full justify-center rounded-md font-semibold text-white py-1.5 px-3 focus:outline-2 focus:outline-offset-2 `}
            >
              {!signUp ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>

        {!signUp ? (
          <div className="text-center">
            <p className="mt-10 text-sm text-center text-gray-500 dark:text-mainColor">
              Not a member?{' '}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                onClick={() => setSignUp(true)}
              >
                Sign up for free
              </a>
            </p>
            <p className="mt-2">
              You can sign in with the following test credentials
            </p>
            <p className="mt-2">
              Email: <span className="font-semibold">testuser@test.com</span>
            </p>
            <p>
              Password: <span className="font-semibold">testuser</span>{' '}
            </p>
          </div>
        ) : (
          <p className="mt-10 text-sm text-center text-gray-500">
            Already have an account?{' '}
            <button
              href="#"
              className="font-semibold leading-6 text-red-600 hover:text-red-500"
              onClick={() => setSignUp(false)}
            >
              Sign in
            </button>
          </p>
        )}
      </div>
    </div>
  )
}
export default Auth
