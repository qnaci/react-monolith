const express = require('express')
const app = express();
const PORT = process.env.PORT || 8080
const path = require('path')
const cors = require('cors')
const { todoRouter } = require('./routes/todoRouter')
const { todoRouterV2 } = require('./routes/v2/todoRouter.v2')
const userRouter = require('./routes/userRouter')

// middlewares
app.use(cors())
app.use(express.urlencoded({ extended: true })) // parser x-www-urlencoded
app.use(express.json()) // parsing data dari req json()

// api versioning
const apiRouter = express.Router() // /api
app.use("/api", apiRouter)

// localhost:8080/api
apiRouter.get("/", (req, res) => {
  res.status(200).json({
    message: "ini dari api routes /api"
  })
})

const v1Router = express.Router(); // /api/v1
const v2Router = express.Router();
apiRouter.use("/v1", v1Router);
apiRouter.use("/v2", v2Router);


// localhost:8080/api/v1
v1Router.get("/", (req, res) => {
  res.status(200).json({
    message: "ini dari api routes /api/v1"
  })
})

// api versioning

// localhost:8080/api/v1/todos
v1Router.use('/todos', todoRouter)
// localhost:8080/api/v1/users
v1Router.use('/users', userRouter)


// localhost:8080/api/v2
v2Router.get('/', (req, res) => {
  res.status(200).json({
    message: "ini dari api routes /api/v2"
  })
})

// localhost:8080/api/v2/todos
v2Router.use('/todos', todoRouterV2)

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