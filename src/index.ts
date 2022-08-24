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

dotenv.config()
const app = express()

AppDataSource.initialize()
  .then(async () => {
    console.log('🟢 Connected successfully to Postgresql 🐘')
  })
  .catch(error => console.log('error caught while connecting to Postgresql : ', error))

const GoogleStrategy = require('passport-google-oauth20')

//Middleware
app.use(express.json())
app.use(
  cors({
    origin: [
      'http://localhost:3000',
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
    saveUninitialized: true,
    // cookie: {
    //   sameSite: 'none',
    //   secure: true,
    //   maxAge: 1000 * 60 * 60 * 24 * 7, //* One week
    // },
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user: any, done) => {
  return done(null, user)
})

passport.deserializeUser((user: any, done) => {
  //* Whatever we return goes to the client and binds to the req.user property
  // const user = await User.findOneBy({ googleId: id })
  return done(null, user)
})

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.get('/getuser', (req, res) => {
  console.log('sending user data to frontend', req.user)
  return res.send(req.user)
})

app.get('/auth/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.send('success')
  })
})

app.use(createFlashRouter)
app.use(deleteFlashRouter)
app.use(getFlashesRouter)
app.use(googleRouter)
app.use(addToFavoriteRouter)
app.use(editFlashRouter)

app.listen(process.env.PORT || 4000, () => {
  console.log('Server Started')
})
