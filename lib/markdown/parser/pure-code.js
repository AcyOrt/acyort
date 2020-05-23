const { escapes } = require('./esc')

module.exports = block => `<pre class="language-none"><code class="language-none">${escapes(block)}</code></pre>`
