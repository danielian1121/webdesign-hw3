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
    const filter = data.student.filter(element => element.ID === numberId)
    if (filter.length) res.send(filter[0])
    else res.status(404).send('Not find.')
  } catch (e) {
    res.status(500).send({ error: 'Something failed!' })
  }
})

router.post('/students$', async (req, res) => {
  try {
    const ID = req.body.ID
    const name = req.body.name
    const data = JSON.parse(await promises.readFile(path))
    data.student.push({
      ID,
      name
    })
    await promises.writeFile(path, JSON.stringify(data))
    res.status(200).send({ message: 'Create successfully' })
  } catch (e) {
    res.status(500).send({ error: 'Something failed!' })
  }
})

router.delete('/students$', async (req, res) => {
  try {
    const ID = req.body.ID
    const data = JSON.parse(await promises.readFile(path))
    data.student = data.student.filter(element => element.ID !== ID)
    await promises.writeFile(path, JSON.stringify(data))
    res.status(200).send({ message: 'Delete successfully' })
  } catch (e) {
    res.status(500).send({ error: 'Something failed!' })
  }
})

export default router
