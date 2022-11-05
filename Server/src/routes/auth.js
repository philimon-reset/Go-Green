const passport = require('passport');
const Strategy = require('passport-local');
const prisma = require('../Storageengine/initPrisma');
const bcrypt = require('bcrypt');

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
      userName: true,
      email: true,
      createdAt: true,
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
      const { name, userName } = req.body;
      let _hash = await bcrypt.hash(password, 10);

      let user = {
        email,
        name,
        userName,
        password: _hash,
      };

      try {
        let record = await prisma.user.create({
          data: user,
        });

        return done(null, record.id);
      } catch (error) {
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

        if (user == null) {
          return done(null, false, {
            message: 'Not found',
          });
        }

        const validPass = await bcrypt.compare(password, user.password);

        if (validPass) {
          return done(null, user.id);
        }
      } catch (error) {
        done(error, false, {
          message: 'An error occured',
        });
      }
    }
  )
);
