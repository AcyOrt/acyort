const Code = require('./code')
const latex = require('./latex')
const listitem = require('./list')

module.exports = class extends Code {
  constructor(config = {}) {
    super(config)
    this.getHeadingId = config.getHeadingId || (s => s)
  }

  parser(option) {
    const {
      lineNumbers,
      getHeadingId = this.getHeadingId,
    } = option

    return {
      listitem,
      paragraph: latex,
      code: (block, lang) => this.code(block, lang, lineNumbers),
      heading: (text, level) => {
        const regex = /[^<]*(<a href="([^"]+)">([^<]+)<\/a>)/
        const marched = text.match(regex)
        const id = getHeadingId(text)

        if (!marched) {
          return `<h${level}>
  <a href="#${id}" id="${id}"></a>${text}
</h${level}>`
        }

        return `<h${level}>
  <a href="${marched[2]}" id="${marched[2].split('#')[1]}"></a>${marched[3]}
</h${level}>`
      },
    }
  }
}
