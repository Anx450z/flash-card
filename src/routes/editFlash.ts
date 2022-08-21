import express from 'express'
import { AppDataSource } from '../data-source'
import { Flash } from '../entity/Flash'
import { encrypt } from '../helper/encryption'

const router = express.Router()

router.put('/api/flash/edit', async (req, res) => {
  let { flashId, question, answer, tag, flashColor } = req.body

  try {
    if (question && answer) {
      if (question.length < 256 && answer.length < 512) {
        if (tag.length === 0) {
          tag = 'default'
        }
        await AppDataSource.createQueryBuilder()
          .update(Flash)
          .set({
            question: encrypt(question),
            answer: encrypt(answer),
            tag,
            flashColor,
          })
          .where('id = :id', { id: flashId })
          .execute()

        res.send({
          status: 'success',
          msg: 'edited flash successfully',
        })
      } else {
        res.send({
          status: 'error',
          msg: 'question/answer should not be longer than allowed length',
        })
      }
    } else {
      res.send({
        status: 'error',
        msg: 'question/answer must not be empty',
      })
    }
  } catch (error) {
    res.send({
      status: 'error',
      msg: 'error while updating flash',
    })
  }
})

export { router as editFlashRouter }
