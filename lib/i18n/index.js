const parser = require('./parser')
const getLocale = require('./locale')

module.exports = class {
  constructor(dir, locale) {
    this.dir = dir
    this.currentLocale = locale
    this.localeData = null
  }

  set locale(locale) {
    this.currentLocale = locale
  }

  get locale() {
    return this.currentLocale
  }

  parser(type, ...args) {
    if (!this.localeData) {
      this.reset()
    }
    return parser(type, this.localeData, ...args)
  }

  reset() {
    this.localeData = getLocale(this.dir, this.currentLocale)
  }

  __(...args) {
    return this.parser('_', ...args)
  }

  _n(...args) {
    return this.parser('n', ...args)
  }
}
