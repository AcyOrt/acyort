const { readFileSync } = require('fs-extra')
const { join } = require('path')
const yaml = require('js-yaml')

module.exports = (dir, locale) => {
  const path = join(dir, `${locale}.yml`)

  try {
    return yaml.safeLoad(readFileSync(path, 'utf8'))
  } catch (e) {
    return {}
  }
}
