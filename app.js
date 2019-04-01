import express from 'express'
import bodyParser from 'body-parser'
import api from './api/index'
import { projectRoot } from 'setting/config'

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(express.static('static/dist'))

app.use('/api', api)

app.get('/', (req, res) => {
  res.sendFile('static/dist/html/home/index.html', {
    root: projectRoot
  })
})

app.listen(3000)
