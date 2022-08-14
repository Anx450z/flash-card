import { AppDataSource } from './data-source'
import { User } from './entity/User'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import {faker} from '@faker-js/faker'

// AppDataSource.initialize()
//   .then(async () => {
//     console.log('Inserting a new user into the database...')
//     const user = new User()
//     user.firstName = faker.name.firstName()
//     user.lastName = faker.name.lastName()
//     user.email = faker.internet.email()
//     user.userName = faker.name.middleName()
//     await AppDataSource.manager.save(user)
//     console.log('Saved a new user with id: ' + user.id)

//     console.log('Loading users from the database...')
//     const users = await AppDataSource.manager.find(User)
//     console.log('Loaded users: ', users)

//     console.log('Here you can setup and run express / fastify / any other framework.')
//   })
//   .catch(error => console.log(error))

dotenv.config()

const app = express()

AppDataSource.initialize().then(async () => {
  console.log('🟢 Connected successfully to Postgresql 🐘')
}).catch(error => console.log(error))

const GoogleStrategy = require('passport-google-oauth20')

//Middleware
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.set('trust proxy', 1)

app.use(
  session({
    secret: 'ankur',
    resave: true,
    saveUninitialized: true,
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
  return done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  //* Whatever we return goes to the client and binds to the req.user property
  const user = await User.findOneBy({ googleId: id })

  return done(null, user)
})

//* Google Auth
passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
      callbackURL: '/auth/google/callback',
      scope: ['profile'],
      state: true,
    },
    async function (_: any, __: any, profile: any, cb: any) {
      // using _ for parameter which are not required
      // Insert user into DB
      const user = await User.findOneBy({ id: profile.id })
      if (!user) {
        const newUser = new User()
        newUser.id = profile.id
        newUser.userName = profile.name.userName
        newUser.firstName = 'Not Available' || profile.name.givenName
        newUser.lastName = 'Not Available' || profile.name.familyName
        newUser.email = 'Not Available' || profile.email

        await AppDataSource.manager.save(newUser)
        console.log('Saved a new user with id: ' + newUser.id)

        cb(null, newUser)
      }
      cb(null, user)
    }
  )
)

//* google routes
app.get('/auth/google', passport.authenticate('google'))
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: true,
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect('/')
  }
)

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.get('/getuser', (req, res) => {
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
