import express, { response } from 'express'
import { AppDataSource } from '../data-source'
import { Flash } from '../entity/Flash'
import { User } from '../entity/User'

const router = express.Router()

router.get('/api/user/:userId/flashes', async (req, res) => {
  const { userId } = req.params

  const flashes = await AppDataSource.createQueryBuilder()
    .select('*')
    .from(Flash, 'flash')
    .where('user_id = :userId', { userId })
    .getRawMany()

  const decryptedFlashes = flashes.map(flash => ({
    id: flash.id,
    question: flash.question,
    answer: flash.answer,
    tag: flash.tag,
    flashColor: flash.flashColor,
    createdAt: flash.createdAt,
    UpdatedAt: flash.updatedAt,
    user_id: flash.user_id,
  }))

  console.log(decryptedFlashes)
  res.json(flashes)
})

export { router as getFlashesRouter }
