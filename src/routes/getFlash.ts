import express from 'express'
import { AppDataSource } from '../data-source'
import { Flash } from '../entity/Flash'
import { User } from '../entity/User'

const router = express.Router()

router.get('/api/user/:userId/flashes',async (req, res) => {
  
})