const { expect } = require('chai')
const { Exam } = require('../src/Exam.js')
const { Item } = require('../src/Item.js')
const { Section } = require('../src/Section.js')

const locale = (a, b) => require('../src/util.js').locale(a.prompt, b.prompt)

describe("Exam", () => {
    let exam, section, title, paragraph, items

    beforeEach(() => {
      items = [
        new Item("What is the capital of Iowa?", [ "Des Moines", "Iowa City", "Cedar Rapids", "Burlington" ]),
        new Item("What is the capital of Missouri?", [ "Jefferson City", "St. Louis", "Kansas City", "Springfield" ]),
        new Item("What is the capital of Ohio?", [ "Columbus", "Toledo", "Cincinatti", "Dayton" ])
      ]

      title = "Capitals"
      paragraph = "Choose the correct answer from the options provided. There should be only one correct answer."

      section = new Section(title, paragraph, items)
      exam = new Exam(title, paragraph, [ section ])
    })

    describe("@setTemplate()", () => {
        it("should be a function", () => expect(Exam.setTemplate).to.be.a('function'))
        it("should not allow call on instance", () => expect(exam.setTemplate).to.not.be.a('function'))
    })

    describe(".constructor()", () => {
      it("should return the instance", () => expect(new Exam(title, paragraph, [ section ])).to.be.instanceOf(Exam))
      it("should require a title", () => expect(() => new Exam()).to.throw())
      it("paragraph should throw if not a string or undefined", () => expect(() => new Exam(title, 1)).to.throw())
      it("section should throw if not an array nor undefined", () => expect(() => new Exam(title, paragraph, 2)).to.throw())
      it("section members, if defined, should throw if not all Section instances", () => {
        expect(() => new Exam(title, paragraph, [1, 2])).to.throw()
      })
    })

    describe(".toString()", () => {
        before(() => Exam.setTemplate((index) => `${title}`))
        it("should return a string", () => expect(exam.toString()).to.be.a('string'))
        it("should use a given template function", () => { expect(exam.toString()).to.equal(title) })
    })

    describe(".indexItems()", () => {
        it("should be a function", () => expect(exam.indexItems).to.be.a('function') )
        it("should return the exam instance", () => expect(exam.indexItems()).to.be.instanceOf(Exam))
        it("should change the index of items in the exam sections", () => {
          prevIndex = exam.sections[0].items[1].index
          expect(exam.indexItems().sections[0].items[1].index).to.not.equal(prevIndex)
        })
    })
})
