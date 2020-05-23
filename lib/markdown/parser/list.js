module.exports = (text, task) => {
  if (task) {
    return `<li style="list-style: none">${text}</li>\n`
  }
  return `<li>${text}</li>\n`
}
