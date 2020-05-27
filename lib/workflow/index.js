module.exports = class {
  constructor() {
    this.scripts = []
    this.register = this.register.bind(this)
    this.start = this.start.bind(this)
  }

  register(...fns) {
    for (let i = 0; i < fns.length; i += 1) {
      const fn = fns[i]
      if (typeof fn === 'function') {
        this.scripts.push(fn)
      } else {
        throw new Error('Register error, no a function')
      }
    }
  }

  async start() {
    for (let i = 0; i < this.scripts.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await this.scripts[i]()
    }
  }
}
