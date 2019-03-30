import express from 'express'
import { projectRoot, } from 'setting/config.js'

const app = express()

app.use(express.static('static/dist'))

app.get('/', (req, res) => {
  res.sendFile('static/dist/html/home/index.html', {
    root: projectRoot
  })
})

app.listen(3000)
