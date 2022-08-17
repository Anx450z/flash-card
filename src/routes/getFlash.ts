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
    
  console.log(flashes)
  res.json(flashes)
})

export { router as getFlashesRouter }
