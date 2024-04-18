function Tags({ tags }) {
  return (
    <div className="px-2 mt-4">
      <div>
        <h2 className="pb-4 text-2xl border-b-2 font-whisper">Tags</h2>
        <div className="flex flex-wrap justify-center gap-2 pt-4 text-xs ">
          {tags.map((tag, index) => (
            <div
              className="px-2 py-1 bg-gray-200 cursor-pointer hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-600"
              key={index}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Tags
