const fs = require('fs-extra')
const renderer = require('../renderer')
const Markdown = require('../markdown')
const I18n = require('../i18n')
const { version } = require('../../package.json')
const Workflow = require('../workflow')
const Helper = require('../helper')
const Store = require('../store')
const Config = require('../config')
const Hooks = require('../hooks')
const cli = require('../cli')
const logger = require('../logger')
const utility = require('../utility')

module.exports = (config) => {
  const acyort = {
    version,
    logger,
    renderer,
    workflow: new Workflow(),
    cli,
    store: new Store(),
    config: new Config(config),
    helper: new Helper(config),
    hooks: new Hooks(),
  }

  acyort.util = {
    fs,
    ...utility(acyort),
  }

  return acyort
}

module.exports.Markdown = Markdown
module.exports.I18n = I18n
