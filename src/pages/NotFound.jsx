import notFound from '../assets/404-not-found.jpg'

function NotFound() {
  return (
    <div className="dark:bg-smoky dark:text-mainColor">
      <img
        src={notFound}
        className="object-cover w-screen h-screen"
        alt="not-found"
      />
    </div>
  )
}
export default NotFound
