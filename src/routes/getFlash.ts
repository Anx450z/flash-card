import express, { response } from 'express'
import { AppDataSource } from '../data-source'
import { Flash } from '../entity/Flash'
import { decrypt } from '../helper/encryption'

const router = express.Router()

router.get('/api/user/:userId/flashes', async (req, res) => {
  const { userId } = req.params

  const flashes = await AppDataSource.createQueryBuilder()
    .select('*')
    .from(Flash, 'flash')
    .where('user_id = :userId', { userId })
    .orderBy('flash.createdAt', 'DESC')
    .take(3)
    .getRawMany()
    

  const decryptedFlashes = flashes.map(flash => ({
    id: flash.id,
    question: decrypt(JSON.parse(flash.question)),
    answer: decrypt(JSON.parse(flash.answer)),
    tag: flash.tag,
    flashColor: flash.flashColor,
    createdAt: flash.createdAt,
    UpdatedAt: flash.updatedAt,
    user_id: flash.user_id,
  }))

  res.json(decryptedFlashes)
})

export { router as getFlashesRouter }
