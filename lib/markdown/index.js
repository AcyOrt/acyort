const marked = require('marked')
const Parser = require('./lib')

module.exports = class extends Parser {
  render(content, option = {}) {
    const renderer = Object.assign(new marked.Renderer(), this.parser(option))
    marked.setOptions({ renderer })
    return marked(content)
  }
}

module.exports.lexer = marked.lexer
