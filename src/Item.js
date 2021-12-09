const { getListAlpha } = require('./util.js')

class Item {
  static #template;
  static setTemplate(template) {
    if (typeof template !== "function") { throw new TypeError() }
    else { Item.template = template }
  }
  static getTemplate() { return Item.template }
  static {
      Item.template = (index, prompt, options) => {
        options = options.map((option, index) => `${getListAlpha(index)}. ${option}`)
        return `${index + 1}. ${prompt}\n\t${options.join('\n\t')}\n`
      }
    }

  constructor(prompt, options) {
    if (typeof prompt !== "string") { throw new TypeError }
    if (!Array.isArray(options)) { throw new TypeError }

    this.prompt = prompt
    this.options = options
    this.index = 0
  }

  sort(compareFunction) {
    compareFunction = compareFunction || ((a, b) => a.localeCompare(b))
    this.options.sort(compareFunction)
    return this
  }

  setIndex(index) {
    if (!Number.isInteger(index)) { throw new TypeError }
    else { this.index = index; return this }
  }

  toString() { return Item.getTemplate()(this.index, this.prompt, this.options) } }

module.exports = { Item }
