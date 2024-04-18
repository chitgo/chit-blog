import { useState, useEffect } from 'react'
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from 'firebase/firestore'
import { db } from '../firebase'
import BlogSection from '../components/BlogSection'
import Spinner from '../components/Spinner'
import { deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import Tags from '../components/Tags'
import MostPopular from '../components/MostPopular'
import Trending from '../components/Trending'
import Footer from '../components/Footer'

function Home({ user }) {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState([])
  const [tags, setTags] = useState([])
  const [trendBlogs, setTrendBlogs] = useState([])

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, 'blogs')
    const trendQuery = query(blogRef, where('trending', '==', 'yes'))
    const querySnapshot = await getDocs(trendQuery)
    let trendBlogs = []
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() })
    })
    setTrendBlogs(trendBlogs)
  }

  useEffect(() => {
    getTrendingBlogs()
    const unsub = onSnapshot(
      collection(db, 'blogs'),
      (snapshot) => {
        let list = []
        let tags = []
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get('tags'))
          list.push({ id: doc.id, ...doc.data() })
        })
        const uniqueTags = [...new Set(tags)]
        setTags(uniqueTags)
        setBlogs(list)
        setLoading(false)
      },
      (error) => console.log(error)
    )
    return () => {
      unsub()
      getTrendingBlogs()
    }
  }, [])

  if (loading) return <Spinner />

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteDoc(doc(db, 'blogs', id))
        setLoading(false)
        toast.success('Blog deleted successfully')
      } catch (err) {
        toast.error(err.message)
      }
    }
  }

  return (
    <div className="px-4 mx-auto md:px-12 max-w-screen-2xl dark:bg-smoky dark:text-mainColor">
      <div>
        <div className="">
          <Trending blogs={trendBlogs} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-12">
          <div className="px-2 sm:col-span-9">
            <h1 className="w-full pb-4 mt-4 text-2xl font-medium border-b-2 font-whisper">
              Daily Blogs
            </h1>
            <BlogSection
              blogs={blogs}
              handleDelete={handleDelete}
              user={user}
            />
          </div>
          <div className="sm:col-span-3">
            <Tags tags={tags} />
            <MostPopular blogs={blogs} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Home
