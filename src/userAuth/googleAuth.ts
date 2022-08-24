import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import express from 'express'
import passport from 'passport'
import dotenv from 'dotenv'

dotenv.config()

const GoogleStrategy = require('passport-google-oauth20')

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.GOOGLE_CID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
      state: true,
    },
    async function (_: any, __: any, userinfo: any, cb: any) {
      // using _ for parameter which are not required
      // Insert user into DB
      console.log(" userinfo: ",userinfo)
      const user = await User.findOneBy({ googleId: userinfo.id })
      console.log('user ===', user)
      try {
        if (!user) {
          // console.log("Creating new user")
          const newUser = new User()
          newUser.googleId = userinfo.id
          newUser.userName = userinfo.emails[0].value
          newUser.firstName = userinfo.name.givenName
          newUser.lastName = userinfo.name.familyName
          newUser.email = userinfo.emails[0].value
          newUser.photo = userinfo.photos[0].value

          await AppDataSource.manager.save(newUser)
          // console.log('Saved a new user with id: ' + newUser.id)
          cb(null, newUser)
        } else {
          cb(null, user)
        }
      } catch (error) {
        cb(error, user)
      }
    }
  )
)

export const googleRouter = express.Router()
//* google routes
googleRouter.get('/auth/google', passport.authenticate('google'))
googleRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failure',
    session: true,
    failureMessage: true,
    // successRedirect: '/success',
  }),
  function (req, res) {
    // console.log(process.env.FRONT_END || 'https://snazzy-starlight-dbf8b2.netlify.app')
    res.redirect('https://snazzy-starlight-dbf8b2.netlify.app')
  }
)
