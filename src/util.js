// turn a number into a letter
// i.e., 0 = a, 1 = b, etc.
const getListAlpha = i => {
  if (!Number.isInteger(i)) { throw new TypeError() }
  else { return (i >= 26 ? getListAlpha(Math.floor(i / 26) -1) : '') + 'abcdefghijklmnopqrstuvwxyz'[i % 26] }
}

// compareFunction to be used with *Array.sort*
// uses Math.random to shuffle an array
const random = () => 0.5 - Math.random()
const locale = ((a, b) => a.localeCompare(b))

module.exports = { getListAlpha, random, locale }
