import express from 'express'
import { AppDataSource } from '../data-source'
import { Flash } from '../entity/Flash'
import { User } from '../entity/User'
import { encrypt } from '../helper/encryption'

const router = express.Router()

router.post('/api/user/:userID/newflash', async (req, res) => {
  const { userID } = req.params
  let { question, answer, tag, flashColor } = req.body

  const user = await User.findOneBy({ id: parseInt(userID) })
  if (!user) {
    res.send({
      msg: 'user not found',
      status: 'failed',
    })
  } else {
    if (question && answer) {
      if (question.length < 256 && answer.length < 512) {
        if (tag.length === 0) {
          tag = 'default'
        }

        const flash = Flash.create({
          user,
          question: encrypt(question),
          answer: encrypt(answer),
          tag,
          flashColor,
        })
        try {
          await AppDataSource.manager.save(flash)
          res.send({ msg: 'flash saved', status: 'success' })
        } catch (error) {
          res.send({ msg: error, status: 'error' })
        }
      } else {
        res.send({
          msg: 'question/answer must be less than 256 characters',
          status: 'failed',
        })
      }
    }else{
      res.send({
        status: 'error',
        msg: 'question/answer must not be empty',
      })
    }
  }
})

export { router as createFlashRouter }
