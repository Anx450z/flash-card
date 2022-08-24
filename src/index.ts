import { AppDataSource } from './data-source'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import { createFlashRouter } from './routes/createFlash'
import { deleteFlashRouter } from './routes/deleteFlash'
import { getFlashesRouter } from './routes/getFlash'
import { googleRouter } from './userAuth/googleAuth'
import { addToFavoriteRouter } from './routes/favoriteFlash'
import { editFlashRouter } from './routes/editFlash'
import cookieParser from 'cookie-parser'
import { User } from './entity/User'

dotenv.config()
const app = express()

AppDataSource.initialize()
  .then(async () => {
    console.log('🟢 Connected successfully to Postgresql 🐘')
  })
  .catch(error => console.log('error caught while connecting to Postgresql : ', error))

const GoogleStrategy = require('passport-google-oauth20')

//Middleware
app.use(cookieParser('secret'))
app.use(express.json())
app.use(
  cors({
    origin: [
      'https://snazzy-starlight-dbf8b2.netlify.app',
      'https://production--snazzy-starlight-dbf8b2.netlify.app/',
    ],
    credentials: true,
  })
)

app.set('trust proxy', 1)

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, //* One week
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user: any, done) => {
  console.log("serializeUser", user.id)
  return done(null, user.id)
})

passport.deserializeUser( async (id: number, done :any) => {
  //* Whatever we return goes to the client and binds to the req.user property
  const user = await User.findOneBy({ id })
  console.log("deserializeUser", user)
  return done(null, user)
})

// Routes
app.use(googleRouter)
app.use(createFlashRouter)
app.use(deleteFlashRouter)
app.use(getFlashesRouter)
app.use(addToFavoriteRouter)
app.use(editFlashRouter)

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.get('/getuser', (req, res) => {
  console.log('sending user data to frontend', req.user)
  res.send(req.user)
})

app.get('/auth/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.send('success')
  })
})

app.listen(process.env.PORT || 4000, () => {
  console.log('Server Started')
})
