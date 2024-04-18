import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import Tags from '../components/Tags'
import MostPopular from '../components/MostPopular'
function Detail() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [tags, setTags] = useState([])

  useEffect(() => {
    const getBlogsData = async () => {
      const blogRef = collection(db, 'blogs')
      const blogs = await getDocs(blogRef)
      setBlogs(blogs.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      let tags = []
      blogs.docs.map((doc) => {
        tags.push(...doc.get('tags'))
      })
      let uniqueTags = [...new Set(tags)]
      setTags(uniqueTags)
    }
    getBlogsData()
  }, [])

  useEffect(() => {
    id && getBlogDetail()
  }, [id])

  const getBlogDetail = async () => {
    const docRef = doc(db, 'blogs', id)
    const blogDetail = await getDoc(docRef)
    setBlog(blogDetail.data())
  }

  return (
    <div className="mx-auto max-w-screen-2xl dark:bg-smoky dark:text-mainColor">
      <div className="relative">
        <img
          src={blog?.imgUrl}
          alt={blog?.title}
          className="object-cover object-center w-full h-[350px] brightness-50"
        />
        <div className="absolute bottom-0 left-0 right-0 py-4 text-center ">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-mainColor font-whisper">
            {blog?.title}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 px-4 sm:px-12 md:px-24 lg:px-36 sm:gap-6 sm:grid-cols-12">
        <div className="sm:col-span-8">
          <div className="py-5 border-b-2">
            <span>By </span>
            <span className="font-semibold capitalize"> {blog?.author} </span>
            <span> - {blog?.timestamp.toDate().toDateString()}</span>
          </div>

          <div className="py-4 leading-7 tracking-wider">
            <p>{blog?.description}</p>
          </div>
        </div>

        <div className="col-span-4 ">
          <div>
            <Tags tags={tags} />
          </div>
          <div>
            <MostPopular blogs={blogs} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Detail
