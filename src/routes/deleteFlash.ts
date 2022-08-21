import express from 'express'
import { Flash } from '../entity/Flash'

const router = express.Router()

router.delete('/api/flash/:flashID/delete', async (req, res) => {
  const { flashID } = req.params

  try {
    const response = await Flash.delete(flashID)
    return res.json({
      msg: response,
      status: 'success',
    })
  } catch (error) {
    return res.json({ msg: error, status: 'error' })
  }
})

export { router as deleteFlashRouter }
