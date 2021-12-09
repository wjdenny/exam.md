const { assert, expect } = require('chai')
const { getListAlpha, random } = require('../src/util.js')

describe("Utility functions", () => {
  describe("#getListAlpha()", () => {
    it("should reject a non-integer", () => { expect(() => getListAlpha(0.5)).to.throw(TypeError) })
    it("should return a string", () => expect(getListAlpha(1)).to.be.a("string"))
    it("should return double letters after *z*", () => expect(getListAlpha(26)).to.equal("aa"))
  })

  describe("#random()", () => {
    it("should be a function", () => expect(random).to.be.a('function'))
    it("should return a number", () => expect(random()).to.be.a('number'))
  })
})
