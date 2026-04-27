const express = require('express')
const { default: connectDb } = require('./db/connect')
const app = express()
const userRouter = require('./route/user')

const port = 8000
connectDb()
app.use(express.json())
app.use('/', userRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})