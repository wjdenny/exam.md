const { expect } = require('chai')
const { Item } = require('../src/Item.js')
const { locale } = require('../src/util.js')

describe("Item", () => {
  const prompt = "the prompt of the test item"
  const options = [ "the answer of the test item", "a wrong answer 1", "a wrong answer 2", "a wrong answer 3"]

  describe("@setTemplate()", () => {
      const item = new Item(prompt, options)
      it("should be a function", () => expect(Item.setTemplate).to.be.a('function'))
      it("should not allow call on instance", () => expect(() => item.setTemplate(`error`)).to.throw())
  })

  describe(".constructor()", () => {
    it("should return an Item instance", () => expect(new Item(prompt, options)).to.be.an.instanceOf(Item))
    it("should require a prompt", () => expect(() => new Item()).to.throw())
    it("should require options", () => expect(() => new Item(prompt)).to.throw())
    it("should require prompt to be a string", () => expect(() => new Item(2, options)).to.throw())
    it("should require options to be an array", () => expect(() => new Item(prompt, "not an array")).to.throw())
  })

  describe(".setIndex()", () => {
    const item = new Item(prompt, options)

    it("should be a function", () => expect(item.setIndex).to.be.a('function'))
    it("should return the object", () => expect(item.setIndex(2)).to.deep.equal(item))
    it("should require an integer", () => expect(() => item.setIndex('a')).to.throw())
    it("should set the index property on the instance", () => expect(item.setIndex(2).index).to.equal(2))
  })

  describe(".sort()", () => {
    let item;

    beforeEach(() => { item = new Item(prompt, [ "d", "c", "b", "a"]) })

    it("should be a function", () => expect(item.sort).to.be.a('function'))
    it("should return an instance of Item", () => { expect(item.sort(locale)).to.be.instanceOf(Item) })
    it("should reject any argument besides a function", () => { expect(() => item.sort('a')).to.throw() })
    it("should change the order of options", () => {
      let prevOptions = item.options.join()
      expect(item.sort(locale).options.join()).to.not.equal(prevOptions)
    })
  })

  describe(".toString()", () => {
    const item = new Item(prompt, options)
    it("should return a string", () => expect(item.toString()).to.be.a('string'))
    it("should use a given template function", () => {
        Item.setTemplate((index) => `Item #${index}`)
        expect(item.toString()).to.equal(`Item #${item.index}`)
    })
  })
})
