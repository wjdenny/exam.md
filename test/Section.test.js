const { expect } = require('chai')
const { Section } = require('../src/Section.js')
const { Item } = require('../src/Item.js')
const locale = (a, b) => require('../src/util.js').locale(a.prompt, b.prompt)

describe("Section", () => {
    let section, title, paragraph, items

    beforeEach(() => {
      items = [
        new Item("What is the capital of Iowa?", [ "Des Moines", "Iowa City", "Cedar Rapids", "Burlington" ]),
        new Item("What is the capital of Missouri?", [ "Jefferson City", "St. Louis", "Kansas City", "Springfield" ]),
        new Item("What is the capital of Ohio?", [ "Columbus", "Toledo", "Cincinatti", "Dayton" ])
      ]

      title = "Capitals"
      paragraph = "Choose the correct answer from the options provided. There should be only one correct answer."

      section = new Section(title, paragraph, items)
    })

    describe("@setTemplate()", () => {
        it("should be a function", () => expect(Item.setTemplate).to.be.a('function'))
        it("should not allow call on instance", () => expect(section.setTemplate).to.not.be.a('function'))
    })

    describe(".constructor()", () => {
      it("should return the instance", () => expect(new Section(title, paragraph, items)).to.be.instanceOf(Section))
      it("should require a title", () => expect(() => new Section()).to.throw())
      it("paragraph should throw if not a string or undefined", () => expect(() => new Section(title, 1)).to.throw())
      it("items should throw if not an array nor undefined", () => expect(() => new Section(title, paragraph, 2)).to.throw())
      it("items members, if defined, should throw if not all Item instances", () => {
        expect(() => new Section(title, paragraph, [1, 2])).to.throw()
      })
    })

    describe(".setIndex()", () => {
      it("should be a function", () => { expect(section.setIndex).to.be.a('function') })
      it("should return the instance", () => { expect(section.setIndex(1)).to.be.instanceOf(Section) })
      it("should require an integer", () => { expect(() => section.setIndex('a')).to.throw() })
      it("should set the index property on the instance", () => { expect(section.setIndex(2).index).to.equal(2) })
    })

    describe(".sort()", () => {
        it("should be a function", () => expect(section.sort).to.be.a('function'))
        it("should return an instance of Section", () => { expect(section.sort(locale)).to.be.instanceOf(Section) })
        it("should reject any argument besides a function", () => { expect(() => section.sort('a')).to.throw() })
        it("should change the order of items", () => {
          let prevOptions = section.items.join()
          expect(section.sort(locale).items.join()).to.not.equal(prevOptions)
        })
      })

    describe(".toString()", () => {
        it("should return a string", () => expect(section.toString()).to.be.a('string'))
        it("should use a given template function", () => {
            Section.setTemplate((index) => `Section #${index}`)
            expect(section.toString()).to.equal(`Section #${section.index}`)
        })
    })
})
