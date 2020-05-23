const { sprintf } = require('sprintf-js')

module.exports = (type, locale, vars, ...params) => {
  try {
    let phrase

    vars.split('.').forEach((key) => {
      phrase = phrase ? phrase[key] : locale[key]
    })

    if (type === '_') {
      return sprintf(phrase, ...params)
    }

    const count = Number(params[0])

    if (count === 0) {
      return sprintf(phrase.zero, ...params)
    }

    if (count === 1) {
      return sprintf(phrase.one, ...params)
    }

    return sprintf(phrase.other, ...params)
  } catch (e) {
    return ''
  }
}
