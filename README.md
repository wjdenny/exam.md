# exam&period;md
Generate Markdown for pen and paper assessments or surveys in Node.

## Changelog
- 1.0; minimal viable solution
  - design multiple choice, T/F exam items
  - toString() compiles to Markdown
  - can configure toString() templates
  - can randomize exam items and options

## Roadmap
Changes I have planned in future releases:
- support building exams programmatically, with functions
- support function chaining
- include wider variety randomizing/sorting functions
- implement question/item banks with tags/categories
- support printing answer keys
- refactor to take advantage of class inheritance

## Get Started

You can install **exam&period;md** with npm.

```shell
npm install exam.md --save
```

You can use it in a Node.js script to build your exam.
```js
const { Exam, Section, Item, random } = require('exam.md')

let exam = new Exam("Exam 1", [
  new Section("Capitals", [
    new Item("What is the capital of Iowa?", [
      "Des Moines",
      "Iowa City",
      "Cedar Rapids",
      "Burlington"
    ])
  ])
])

exam.section[0].options = exam.section[0].options.sort(random)

process.stdout.write('% Exam 1\n')
process.stdout.write('% Will Denny\n')
process.stdout.write(`% ${new Date().toLocaleDateString()}\n`)
process.stdout.write(exam)
```

Now you've got an exam written in Markdown. If you want to take the Markdown
and turn it into nicely formatted documents, have a look at these projects:

- [Pandoc](https://github.com/jgm/pandoc)
- [wkhtmltopdf](https://github.com/wkhtmltopdf/wkhtmltopdf)
- [PrinceXML](https://www.princexml.com/)
