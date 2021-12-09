const { getListAlpha, locale } = require('./util.js')
const { Item } = require('./Item.js')

class Section {
  static #template;
  static setTemplate(template) {
    if (typeof template !== "function") { throw new TypeError() }
    else { Section.template = template }
  }
  static getTemplate() { return Section.template }
  static {
      Section.template = (index, title, paragraph, items) => {
        return `## Section ${index + 1}: ${title}\n${paragraph}\n\n${items.join('\n')}\n`
    }
  }

  constructor(title, paragraph, items) {
    if (items && !Array.isArray(items)) { throw new TypeError }
    if (items.filter(item => !(item instanceof Item)).length > 0) { throw new TypeError }

    this.title = title;
    this.paragraph = paragraph || ``;
    this.items = items || [];
    this.index = 0;
  }

  sort(compareFunction) {
    compareFunction = compareFunction || locale
    this.items = this.items.sort(compareFunction).map((item, index) => item.setIndex(index))
    return this
  }

  setIndex(index) {
    if (!Number.isInteger(index)) { throw new TypeError }
    else { this.index = index; return this }
  }

  toString() { return Section.getTemplate()(this.index, this.title, this.paragraph, this.items) }
}

module.exports = { Section }
