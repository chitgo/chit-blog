export const excerpt = (str, count) => {
  if (str.length > count) {
    return str.substring(0, count) + '...'
  }
  return str
}
