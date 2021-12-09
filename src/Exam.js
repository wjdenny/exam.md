const { Section } = require('./Section.js')
const { Item } = require('./Item.js')

class Exam {
  static #template;
  static setTemplate(template) {
    if (typeof template !== "function") { throw new TypeError() }
    else { Exam.template = template }
  }
  static getTemplate() { return Exam.template }
  static {
      Exam.template = (title, paragraph, sections) => {
        return `${paragraph}\n\n${sections.join('\n\n')}\n`
    }
  }

  constructor(title, paragraph, sections) {
    if (sections && !Array.isArray(sections)) { throw new TypeError }
    if (sections.filter(section => !(section instanceof Section)).length > 0) { throw new TypeError }

    this.title = title;
    this.paragraph = paragraph || ``;
    this.sections = sections || [];
  }

  toString() { return Exam.getTemplate()(this.title, this.paragraph, this.sections) }

  indexItems() {
    let i = 0;
    this.sections.forEach(section => {
      section.items.forEach(item => {
        item.setIndex(i++)
      })
    })
    return this
  }
}

module.exports = { Exam }
