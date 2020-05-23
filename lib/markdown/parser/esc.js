const map = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
}

const reverse = {}

Object.keys(map).forEach((key) => {
  reverse[map[key]] = key
})

module.exports.escapes = s => s.replace(/[&<>"'`=/]/g, a => map[a])

module.exports.unescapes = (s) => {
  let back = s

  Object.keys(reverse).forEach((key) => {
    const regex = new RegExp(key, 'g')
    back = back.replace(regex, reverse[key])
  })

  return back
}
