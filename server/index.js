const express = require('express')
const app = express();
const PORT = process.env.PORT || 8080
const path = require('path')

// middlewares
app.use(express.urlencoded({ extended: true })) // parser x-www-urlencoded
app.use(express.json()) // parsing data dari req json()

let pathToClientBuild = path.resolve(__dirname, "..", "client", "build")

app.use("/static", express.static(path.resolve(pathToClientBuild, "static")))
app.use("/index.html", (req, res) => {
  res.sendFile(path.resolve(pathToClientBuild, "index.html"))
})
app.get("*", async (req, res) => {
  res.sendFile(path.resolve(pathToClientBuild, "index.html"))
})

app.listen(PORT, _ => {
  console.log(`listening on port: http://localhost:${PORT}`)
})