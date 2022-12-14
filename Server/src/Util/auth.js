const passport = require('passport');
const Strategy = require('passport-local');
const prisma = require('../Storageengine/initPrisma');
const { HttpError } = require('./error');
const {hashedpassword, unhashpassword} = require("./hashpassword")

// serialize user
passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser(async (_id, done) => {
  let user = await prisma.user.findUniqueOrThrow({
    where: {
      id: _id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      wallet: true,
      PayPal: true,
      pic: true
    },
  });

  done(null, user);
});

// Signup middleware
passport.use(
  'signup',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {

      const {pic, name, PayPal, wallet } = req.body;

      try {
        const hashed = await hashedpassword(password);
        const created = await prisma.user.create({
          data: {
            email,
            name,
            password: hashed,
            wallet: wallet === undefined ? undefined : Number(wallet),
            PayPal,
            pic,
          }
        });
        if (!created) {
          throw new HttpError(422, "User Register failed");
        }
        return done(null, created.id);
      } catch (error) {
        console.log(name, email, password, wallet, PayPal, pic)
        done(error, false, {
          message: 'An error occured',
        });
      }
    }
  )
);

// login middleware
passport.use(
  'login',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        let user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        console.log("here")
        if (user == null) {
          return done(null, false, {
            message: 'Not found',
          });
        }

        const validPass = await unhashpassword(password, user.password);

        if (validPass) {
          return done(null, user.id);
        }
        throw new HttpError(401, "Password hash failed");
      } catch (error) {
        done(error, false, {
          message: 'An error occured',
        });
      }
    }
  )
);
