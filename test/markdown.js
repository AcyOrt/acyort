/* eslint no-extend-native: 0 */

const assert = require('power-assert')
const Marked = require('../lib/markdown')

String.prototype.trim = function trim() {
  return this
    .replace(/\n/g, '')
    .replace(/[\t ]+</g, '<')
    .replace(/>[\t ]+</g, '><')
    .replace(/>[\t ]+$/g, '>')
}

describe('markdown', () => {
  it('heading', () => {
    let marker = new Marked()
    const h0 = '# An h1 header'
    const h1 = '# [An h1 header](#one)'

    assert(marker.render(h0).trim() === '<h1><a href="#An h1 header" id="An h1 header"></a>An h1 header</h1>')
    assert(marker.render(h1).trim() === '<h1><a href="#one" id="one"></a>An h1 header</h1>')

    const option = { getHeadingId: () => 'heading' }
    assert(marker.render(h0, option).trim() === '<h1><a href="#heading" id="heading"></a>An h1 header</h1>')

    marker = new Marked({ getHeadingId: () => 'heading' })
    assert(marker.render(h0).trim() === '<h1><a href="#heading" id="heading"></a>An h1 header</h1>')
  })

  it('code', () => {
    let marker = new Marked()
    let code = '```html\n<h1>h1</h1>\n```'

    assert(marker.render(code).trim() === '<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>h1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span></code></pre>')

    assert(marker.render(code, { lineNumbers: false }).trim() === '<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>h1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span></code></pre>')

    assert(marker.render(code, { lineNumbers: true }).trim() === '<div class="code-highlight"><table><tbody><tr><td class="code-highlight-line"><pre class="language-none"><code class="language-none"><span>1</span></code></pre></td><td class="code-highlight-code"><pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>h1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span></code></pre></td></tr></tbody></table></div>')

    code = '```javascript\nvar a = 1;\n```'

    assert(marker.render(code).trim() === '<pre class="language-javascript"><code class="language-javascript"><span class="token keyword">var</span> a<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span></code></pre>')

    code = '```\n<h1>h1</h1>\n```'

    assert(marker.render(code).trim() === '<pre class="language-none"><code class="language-none">&lt;h1&gt;h1&lt;&#x2F;h1&gt;</code></pre>')
    assert(marker.render(code, { lineNumbers: true }).trim() === '<div class="code-highlight"><table><tbody><tr><td class="code-highlight-line"><pre class="language-none"><code class="language-none"><span>1</span></code></pre></td><td class="code-highlight-code"><pre class="language-none"><code class="language-none">&lt;h1&gt;h1&lt;&#x2F;h1&gt;</code></pre></td></tr></tbody></table></div>')

    code = '```sss\n<h1>h1</h1>\n```'
    assert(marker.render(code).trim() === '<pre class="language-none"><code class="language-none">&lt;h1&gt;h1&lt;&#x2F;h1&gt;</code></pre>')

    code = '```html\n<h1>h1</h1>\n```'
    marker = new Marked({ lineNumbers: true })

    assert(marker.render(code).trim() === '<div class="code-highlight"><table><tbody><tr><td class="code-highlight-line"><pre class="language-none"><code class="language-none"><span>1</span></code></pre></td><td class="code-highlight-code"><pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>h1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span></code></pre></td></tr></tbody></table></div>')

    marker = new Marked({ lineNumbers: false })
    assert(marker.render(code).trim() === '<pre class="language-html"><code class="language-html"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>h1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span></code></pre>')
  })

  it('mathjax', () => {
    const marker = new Marked()
    const text0 = `先看一下矩阵的显示效果:
实例：$$f(x)=x$$ 测试
# 安装与配`
    const text1 = `先看一下矩阵的显示效果:
实例：$f(x)=x$
# 安装与配`
    const text2 = `先看一下矩阵的显示效果:
实例：$$f(x)=x$
# 安装与配`
    const text3 = `先看一下矩阵的显示效果:
实例：$f(x)=x$$
# 安装与配`

    const res0 = '<p>先看一下矩阵的显示效果:实例：</p><div class="latex-math" style="text-align:center"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mi>x</mi></mrow><annotation encoding="application/x-tex">f(x)=x</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathdefault" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathdefault">x</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:0.43056em;vertical-align:0em;"></span><span class="mord mathdefault">x</span></span></span></span></div><p> 测试</p><h1><a href="#安装与配" id="安装与配"></a>安装与配</h1>'
    const res1 = '<p class="latex-math">先看一下矩阵的显示效果:实例：<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mi>x</mi></mrow><annotation encoding="application/x-tex">f(x)=x</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathdefault" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathdefault">x</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:0.43056em;vertical-align:0em;"></span><span class="mord mathdefault">x</span></span></span></span></p><h1><a href="#安装与配" id="安装与配"></a>安装与配</h1>'
    const res2 = '<p>先看一下矩阵的显示效果:实例：$$f(x)=x$</p><h1><a href="#安装与配" id="安装与配"></a>安装与配</h1>'
    const res3 = '<p class="latex-math">先看一下矩阵的显示效果:实例：<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mi>x</mi></mrow><annotation encoding="application/x-tex">f(x)=x</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathdefault" style="margin-right:0.10764em;">f</span><span class="mopen">(</span><span class="mord mathdefault">x</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2777777777777778em;"></span></span><span class="base"><span class="strut" style="height:0.43056em;vertical-align:0em;"></span><span class="mord mathdefault">x</span></span></span></span>$</p><h1><a href="#安装与配" id="安装与配"></a>安装与配</h1>'

    assert(marker.render(text0).trim() === res0)
    assert(marker.render(text1).trim() === res1)
    assert(marker.render(text2).trim() === res2)
    assert(marker.render(text3).trim() === res3)
  })

  it('task list', () => {
    const marker = new Marked()
    let list = '- [x] this is a complete item'

    assert(marker.render(list).includes('list-style: none') === true)

    list = '* Item 1'
    assert(marker.render(list).trim() === '<ul><li>Item 1</li></ul>')
  })
})
