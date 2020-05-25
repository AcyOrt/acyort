const { readFileSync } = require('fs-extra')
const yaml = require('js-yaml')
const swig = require('swig-templates')
const Markdown = require('../markdown')

swig.setDefaults({
  cache: false,
  autoescape: false,
})

const markdown = new Markdown()

class Renderer {
  constructor() {
    this.engines = {
      swig: {
        render: (text, data, ...params) => swig.render(text, { locals: data }, ...params),
        renderFile: swig.renderFile,
      },
      yaml: {
        render: yaml.safeLoad,
        renderFile: (path, ...params) => yaml.safeLoad(readFileSync(path, 'utf8'), ...params),
      },
      markdown: {
        render: markdown.render.bind(markdown),
        renderFile: (path, ...params) => markdown.render(readFileSync(path, 'utf8'), ...params),
      },
    }
  }

  register(engine, methods) {
    if (this.engines[engine]) {
      throw new Error(`Renderer: ${engine} currently exists`)
    }
    this.engines[engine] = methods
  }

  render(engine, ...params) {
    if (!this.engines[engine]) {
      throw new Error(`Cannot find renderer: ${engine}`)
    }
    return this.engines[engine].render(...params)
  }

  renderFile(engine, ...params) {
    if (!this.engines[engine]) {
      throw new Error(`Cannot find renderer: ${engine}`)
    }
    return this.engines[engine].renderFile(...params)
  }
}

module.exports = new Renderer()
