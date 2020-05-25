const marked = require('marked')
const Parser = require('./parser')

module.exports = class extends Parser {
  render(content, option = {}) {
    const renderer = Object.assign(new marked.Renderer(), this.parser(option))
    marked.setOptions({ renderer })
    return marked(content)
  }
}
