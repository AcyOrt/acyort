const { join, resolve } = require('path')
const renderer = require('../renderer')
const defaults = require('./defaults')
const getTemplatePath = require('./template')

module.exports = (arg) => {
  let config
  let base

  if (typeof arg === 'string') {
    base = arg
    try {
      config = renderer.renderFile('yaml', join(base, 'config.yml'))
    } catch (e) {
      return null
    }
  } else {
    config = arg || {}
    base = config.base || process.cwd()
  }

  config.base = resolve(base)

  Object.keys(defaults).forEach((key) => {
    if (config[key] === undefined || config[key] === null) {
      config[key] = defaults[key]
    }
  })

  config.templatePath = getTemplatePath(config)

  return config
}
