import React, { useState, useEffect } from 'react'
import ReactTagInput from '@pathofdev/react-tag-input'
import '@pathofdev/react-tag-input/build/index.css'
import { db, storage } from '../firebase'
import { useNavigate, useParams } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { toast } from 'react-toastify'

const initialState = {
  title: '',
  tags: [],
  trending: 'no',
  category: '',
  description: '',
  comments: [],
  likes: [],
}

const categoryOption = [
  'Fashion',
  'Technology',
  'Food',
  'Sports',
  'Movies',
  'Music',
  'Travel',
]

const AddEditBlog = ({ user }) => {
  const [form, setForm] = useState(initialState)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(null)

  const { id } = useParams()

  const navigate = useNavigate()

  const { title, tags, category, trending, description } = form

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          setProgress(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default:
              break
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info('Image upload to firebase successfully')
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }))
          })
        }
      )
    }

    file && uploadFile()
  }, [file])

  useEffect(() => {
    id && getBlogDetail()
  }, [id])

  const getBlogDetail = async () => {
    const docRef = doc(db, 'blogs', id)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() })
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleTags = (tags) => {
    setForm({ ...form, tags })
  }

  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value })
  }

  const handleCategory = (e) => {
    setForm({ ...form, category: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, 'blogs'), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          })
          toast.success('Blog created successfully')
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await updateDoc(doc(db, 'blogs', id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          })
          toast.success('Blog updated successfully')
        } catch (err) {
          console.log(err)
        }
      }
    } else {
      return toast.error('All fields must be filled')
    }

    navigate('/')
  }

  return (
    <div className="h-screen p-6 mx-auto text-center max-w-screen-2xl dark:bg-smoky dark:text-mainColor">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-mainColor">
        {!id ? 'Create a new blog' : 'Edit Blog'}
      </h1>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md md:max-w-xl">
        <form className="space-y-4">
          <div className="mt-2">
            <input
              id="title"
              name="title"
              type="text"
              autoComplete="title"
              placeholder="Title"
              value={title}
              onChange={handleChange}
              required
              className="block w-full py-2 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            />
          </div>

          <div className="mt-2">
            <ReactTagInput
              tags={tags}
              placeholder="Tags"
              onChange={handleTags}
              required
            />
          </div>

          {/* radio button */}
          <div className="flex gap-24 mt-2">
            <p>Is this blog trending?</p>
            <div className="flex">
              <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                <label htmlFor="trending">Yes</label>
                <input
                  type="radio"
                  value="yes"
                  name="radioOption"
                  checked={trending === 'yes'}
                  onChange={handleTrending}
                  className="relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
                />
              </div>
              <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem] ml-4">
                <input
                  type="radio"
                  value="no"
                  name="radioOption"
                  checked={trending === 'no'}
                  onChange={handleTrending}
                  className="relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
                />
                <label htmlFor="trending">No</label>
              </div>
            </div>
          </div>

          {/* select */}
          <div className="mt-2 ">
            <select
              id="category"
              name="category"
              onChange={handleCategory}
              required
              value={category}
              className="block w-full py-2 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
            >
              <option>Category</option>
              {categoryOption.map((option) => (
                <option key={option} value={option || ''}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* textarea */}
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              rows={5}
              type="text"
              autoComplete="description"
              placeholder="Description"
              value={description}
              onChange={handleChange}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none"
            />
          </div>

          {/* file upload */}
          <div className="mt-2">
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900   sm:text-sm sm:leading-6 dark:text-mainColor"
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              disabled={progress !== null && progress < 100}
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring transition duration-300"
            >
              {id ? 'Update' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default AddEditBlog
