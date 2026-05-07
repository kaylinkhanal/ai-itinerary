const express = require('express')
const { default: connectDb } = require('./db/connect')
const app = express()
const cors = require('cors')
const userRouter = require('./route/user')
const genAIRouter = require('./route/genai')
require('dotenv').config();
const port = 8000
connectDb()
app.use(cors())
app.use(express.json())
app.use('/', userRouter)
app.use('/', genAIRouter)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})