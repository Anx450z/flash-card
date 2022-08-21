import express from 'express'
import { AppDataSource } from '../data-source'
import { Flash } from '../entity/Flash'

const router = express.Router()

router.patch('/api/flash/favorite', async (req, res) => {
  const {flashId, favorite} = req.body
  console.log("favorite",favorite)
  try {
    await AppDataSource.createQueryBuilder()
      .update(Flash)
      .set({ favorite })
      .where('id = :id', { id: flashId })
      .execute()

    res.send({
      status: 'success',
      msg: 'set favorite to ' + favorite,
    })
  } catch (error) {
    res.send({
      status: 'error',
      msg: 'error adding flash to favorites',
    })
  }
})

export { router as addToFavoriteRouter }
