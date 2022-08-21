import express from 'express'
import { AppDataSource } from '../data-source'
import { Flash } from '../entity/Flash'

const router = express.Router()

router.patch('/api/flash/favorite', async (req, res) => {
  const {flashId} = req.body
  try {
    await AppDataSource.createQueryBuilder()
      .update(Flash)
      .set({ favorite: true })
      .where('id = :id', { id: flashId })
      .execute()

    res.send({
      status: 'success',
      msg: 'added to favorites',
    })
  } catch (error) {
    res.send({
      status: 'error',
      msg: 'error adding flash to favorites',
    })
  }
})

export { router as addToFavoriteRouter }
