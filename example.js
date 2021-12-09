const { Exam, Section, Item, random } = require('./index.js')

const exam = new Exam(
  "Exam 1",
  "This is an example exam.",
  [
    new Section(
      "Capitals",
      "Choose the correct answer from the options provided. There should be only one correct answer.",
      [
        new Item(
          "What is the capital of Iowa?",
          [ "Des Moines", "Iowa City", "Cedar Rapids", "Burlington" ]
        ),
        new Item(
          "What is the capital of Missouri?",
          [ "Jefferson City", "St. Louis", "Kansas City", "Springfield" ]
        )
      ]
    )
  ]
)

exam.sections.forEach((section, index) => section.setIndex(index))
exam.indexItems()
process.stdout.write(`${exam}`)
