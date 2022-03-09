const todoRouter = require('express').Router()

todoRouter.get("/", (req, res) => {
  res.status(200).json({
    todos: [{
      id: 1,
      name: 'icanq',
      agenda: "memasak"
    }, {
      id: 2,
      name: 'icanq',
      agenda: "mengaji"
    }, {
      id: 3,
      name: 'icanq',
      agenda: "mandi"
    }]
  })
})

module.exports = { todoRouter }