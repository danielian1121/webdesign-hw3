import express from 'express'
import { promises } from 'fs'
import { projectRoot } from '../setting/config'

const router = express.Router()
const path = `${projectRoot}/data/student.json`

router.get('/students$', async (req, res) => {
  try {
    res.send(JSON.parse(await promises.readFile(path)))
  } catch (e) {
    res.status(500).send({ error: 'Something failed!' })
  }
})

router.get('/students/:numberId', async (req, res) => {
  const numberId = req.params.numberId
  try {
    const data = JSON.parse(await promises.readFile(path))
    for (let Id of data.student) {
      if (Id[numberId])
        res.send(Id)
    }
    res.status(404).send({ error: 'Not find.' })
  } catch (e) {
    res.status(500).send({ error: 'Something failed!' })
  }
})

export default router
