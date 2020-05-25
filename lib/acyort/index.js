const fs = require('fs-extra')
const renderer = require('../renderer')
const Markdown = require('../markdown')
const I18n = require('../i18n')
const { version } = require('../../package.json')
const workflow = require('../workflow')
const Helper = require('../helper')
const Store = require('../store')
const Config = require('../config')
const Hooks = require('../hooks')
const cli = require('../cli')
const logger = require('../logger')
const utility = require('../utility')

module.exports = (config) => {
  const acyort = {
    fs,
    version,
    logger,
    renderer,
    workflow,
    cli,
    store: new Store(),
    config: new Config(config),
    helper: new Helper(config),
    hooks: new Hooks(),
  }

  acyort.util = utility(acyort)

  return acyort
}

module.exports.Markdown = Markdown
module.exports.I18n = I18n
