import express from 'express'
import { AppDataSource } from '../data-source'
import { Flash } from '../entity/Flash'
import { User } from '../entity/User'
import { encrypt } from '../helper/encryption'

const router = express.Router()

router.post('/api/user/:userID/newflash', async (req, res) => {
  const { userID } = req.params
  const { question, answer, tag, flashColor } = req.body

  const user = await User.findOneBy({ id: parseInt(userID) })
  if (!user) {
    return res.json({
      msg: 'user not found',
      status: 'failed',
    })
  }

  if (encrypt(question).content.length < 256 && encrypt(answer).content.length < 512) {
    const flash = Flash.create({
      user,
      question: encrypt(question),
      answer: encrypt(answer),
      tag,
      flashColor,
    })
    try {
      await AppDataSource.manager.save(flash)
      return res.json({ msg: 'flash saved', status: 'success' })
    } catch (error) {
      return res.json({ msg: error, status: 'error' })
    }
  } else {
    return res.json({
      msg: 'question/answer must be less than 256 characters',
      status: 'failed',
    })
  }
})

export { router as createFlashRouter }
