const { EOL } = require('os')
const Prism = require('prismjs')
const loadLanguages = require('prismjs/components/')
const pureCode = require('./pure-code')

const map = {
  xml: 'markup',
  html: 'markup',
  mathml: 'markup',
  svg: 'markup',
  js: 'javascript',
  md: 'markdown',
  yml: 'yaml',
  rb: 'ruby',
  shell: 'bash',
  py: 'python',
  dotnet: 'csharp',
  coffee: 'coffeescript',
}

module.exports = class {
  constructor(config) {
    this.lineNumbers = config.lineNumbers
  }

  code(block, lang, lineNumbers) {
    let code

    if (!lang) {
      code = pureCode(block)
    } else {
      loadLanguages([map[lang] || lang])
      const grammar = Prism.languages[lang]

      code = grammar
        ? `<pre class="language-${lang}"><code class="language-${lang}">${Prism.highlight(block, grammar, lang)}</code></pre>`
        : pureCode(block)
    }

    const line = `<pre class="language-none"><code class="language-none">${block.split(EOL).map((n, i) => `<span>${i + 1}</span>\n`).join('')}</code></pre>`

    const codeWidthLines = `<div class="code-highlight">
  <table>
    <tbody>
      <tr>
        <td class="code-highlight-line">${line}</td>
        <td class="code-highlight-code">${code}</td>
      </tr>
    </tbody>
  </table>
</div>`

    if (lineNumbers === true) {
      return codeWidthLines
    }
    if (lineNumbers === false) {
      return code
    }
    if (this.lineNumbers === false) {
      return code
    }
    if (this.lineNumbers === true) {
      return codeWidthLines
    }

    return code
  }
}
