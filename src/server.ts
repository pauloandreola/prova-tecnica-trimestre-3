import express from 'express'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()

const port = process.env.PORT

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json('Hello World!')
})

app.listen(port, () => (console.log(`Server running at port => ${port}`)))
